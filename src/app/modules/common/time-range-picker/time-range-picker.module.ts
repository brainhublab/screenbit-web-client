import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeRangePickerComponent } from './time-range-picker/time-range-picker.component';



@NgModule({
  declarations: [TimeRangePickerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TimeRangePickerComponent
  ]
})
export class TimeRangePickerModule { }
