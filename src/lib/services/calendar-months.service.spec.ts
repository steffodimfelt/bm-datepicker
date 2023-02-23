import { TestBed } from '@angular/core/testing';

import { CalendarMonthsService } from './calendar-months.service';

describe('CalendarMonthsService', () => {
  let service: CalendarMonthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarMonthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
