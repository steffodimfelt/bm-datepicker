import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmDatepickerComponent } from './bm-datepicker.component';

describe('BmDatepickerComponent', () => {
  let component: BmDatepickerComponent;
  let fixture: ComponentFixture<BmDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmDatepickerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BmDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
