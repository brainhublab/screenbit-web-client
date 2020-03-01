import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Hour { value: string; active: boolean; }

@Component({
  selector: 'app-time-range-picker',
  templateUrl: './time-range-picker.component.html',
  styleUrls: ['./time-range-picker.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeRangePickerComponent),
      multi: true
    }
  ]
})
export class TimeRangePickerComponent implements ControlValueAccessor {
  public hours: Array<Hour> = Array.from(Array(24), (v: string, i: number) => {
    return { value: i.toString().padStart(2, '0'), active: false };
  });

  public lastSelected: Hour | null = null;

  public touching = false;

  @Input() public disabled = false;
  @Input() public readonly = false;
  private onChange: (_: Array<string>) => void;
  private onTouched: () => void;


  private get isEditable() {
    return !this.disabled && !this.readonly;
  }

  mouseDown(hour: Hour) {
    if (this.isEditable) {
      this.touching = true;
      this.lastSelected = hour;
    }
  }

  mouseUp() {
    if (this.isEditable) {
      this.touching = false;
      this.lastSelected = null;
      this.setResultHours();
    }
  }

  private setResultHours() {
    if (this.isEditable) {
      const result = this.hours.filter(v => v.active).map(v => v.value);
      if (this.onChange) {
        this.onChange(result);
      }
    }
  }

  moveMove(hour: Hour) {
    if (this.isEditable && this.touching) {
      this.hours = this.hours.map(v => {
        if (v.value === hour.value) {
          return { ...v, active: !this.lastSelected.active };
        } else {
          return v;
        }
      });
    }
  }


  writeValue(newValue?: Array<string>) {
    this.hours = this.hours.map(hour => {
      return { ...hour, active: newValue ? newValue.includes(hour.value) : false };
    });

  }


  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

}
