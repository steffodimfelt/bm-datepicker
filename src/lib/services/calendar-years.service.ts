import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'platform'
})
export class CalendarYearsService {
  _currentYear: any;
  _selectedYear: any;
  _year: any;
  constructor() {}
  get currentYear() {
    return this._currentYear;
  }
  get selectedYear() {
    return this._selectedYear;
  }
  set nextYear(monthValue: any) {
    this._selectedYear =
      monthValue === 0 ? this._selectedYear + 1 : this._selectedYear;
  }
  set previousYear(monthValue: any) {
    this._selectedYear =
      monthValue === 11 ? this._selectedYear - 1 : this._selectedYear;
  }
  set selectedYear(yearValue: any) {
    this._selectedYear = yearValue;
  }
  set year(date: any) {
    this._year = date;
    this._currentYear = this._year.getFullYear();
    this._selectedYear = this._year.getFullYear();
  }
  returnYearDate(dayInfo: any) {
    return dayInfo.getFullYear();
  }
}
