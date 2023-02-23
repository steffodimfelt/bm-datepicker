import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'platform'
})
export class CalendarMonthsService {
  _date: any;
  _currentMonth: any;
  _selectedMonth: any;
  _selectedYear: any;
  _monthLabels: any;
  _firstDayOfSelectedMonth: any;
  _lastDayOfSelectedMonth: any;
  _yearAltered = 0;

  constructor() {}

  get currentMonth() {
    return this._currentMonth;
  }
  get selectedMonth() {
    return this._selectedMonth;
  }
  get selectedMonthName() {
    return this._monthLabels[this._selectedMonth];
  }
  get selectedMonthDays() {
    return new Date(this._selectedYear, this._selectedMonth, 0).getDate();
  }

  get emptyDaysAtBeginning() {
    let emptyDayArray =
      this._firstDayOfSelectedMonth.getDay() === 0
        ? [null, null, null, null, null, null]
        : [];
    for (let x = 1; x < this._firstDayOfSelectedMonth.getDay(); x++) {
      emptyDayArray.push(null);
    }
    return emptyDayArray;
  }

  selectedMonthDaysArray(isSunday: boolean) {
    let selectedMonthArray = new Date(
      this._selectedYear,
      this._selectedMonth,
      1
    );

    let datesArray: any = this.emptyDaysAtBeginning;
    isSunday && datesArray.push(null);
    while (selectedMonthArray.getMonth() === this._selectedMonth) {
      datesArray.push(new Date(selectedMonthArray));
      selectedMonthArray.setDate(selectedMonthArray.getDate() + 1);
    }
    return this.formatToWeekArray(datesArray);
  }

  set month(date: any) {
    this._date = date;
    this._currentMonth = date.getMonth();
    this._selectedMonth = date.getMonth();
    this._selectedYear = date.getFullYear();
    this._monthLabels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    this._firstDayOfSelectedMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    );
    this._lastDayOfSelectedMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    );
  }

  set monthLabels(monthLabels: any) {
    this._monthLabels = monthLabels;
  }

  firstDayOfSelectedMonth(selectedYear: any, selectedMonth: any) {
    this._firstDayOfSelectedMonth = new Date(selectedYear, selectedMonth, 1);
  }
  lastDayOfSelectedMonth(selectedYear: any, selectedMonth: any) {
    this._lastDayOfSelectedMonth = new Date(selectedYear, selectedMonth + 1, 0);
  }

  formatToWeekArray = (datesArray: any) => {
    let formatedArray: any = [];
    let skipDays = 0;
    for (let weekIndex = 0; weekIndex < datesArray.length / 7; weekIndex++) {
      formatedArray.push([]);
      for (let dayIndex = skipDays; dayIndex < skipDays + 7; dayIndex++) {
        formatedArray[weekIndex].push(datesArray[dayIndex]);
      }
      skipDays = skipDays + 7;
    }
    return formatedArray;
  };

  nextMonth() {
    this._selectedMonth =
      this._selectedMonth >= 11
        ? (this._selectedMonth = 0)
        : this._selectedMonth + 1;
  }
  previousMonth() {
    this._selectedMonth =
      this._selectedMonth === 0
        ? (this._selectedMonth = 11)
        : this._selectedMonth - 1;
  }

  set selectedMonth(monthValue) {
    this._selectedMonth = monthValue;
  }
  returnMonthDate(dayInfo: any) {
    return dayInfo.getMonth();
  }
}
