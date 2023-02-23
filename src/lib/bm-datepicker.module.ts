import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmDatepickerComponent } from './bm-datepicker.component';
import { CheckLockPipe } from './check-lock.pipe';

@NgModule({
  declarations: [BmDatepickerComponent, CheckLockPipe],
  imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule],
  exports: [BmDatepickerComponent]
})
export class BmDatepickerModule {}
