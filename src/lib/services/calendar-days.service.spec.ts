import { TestBed } from '@angular/core/testing';

import { CalendarDaysService } from './calendar-days.service';

describe('CalendarDaysService', () => {
  let service: CalendarDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
