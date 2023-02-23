import { TestBed } from '@angular/core/testing';

import { CalendarYearsService } from './calendar-years.service';

describe('CalendarYearsService', () => {
  let service: CalendarYearsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarYearsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
