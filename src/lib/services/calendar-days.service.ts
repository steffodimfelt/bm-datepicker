import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'platform'
})
export class CalendarDaysService {
  _currentDay: any;
  _selectedDay: any;
  _dayLabels: any;

  constructor() {}
  get currentDay() {
    return this._currentDay;
  }
  get selectedDay() {
    return this._selectedDay;
  }
  get dayLabels() {
    return this._dayLabels;
  }
  set day(date: any) {
    this._currentDay = date.getDate();
    this._selectedDay = date.getDate();
    this._dayLabels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  }
  set selectedDay(dayValue) {
    this._selectedDay = dayValue;
  }
  set dayLabels(weekdays: any) {
    this._dayLabels = weekdays;
  }

  returnWeekdayDate(dayInfo: any) {
    return dayInfo.getDate();
  }
}
