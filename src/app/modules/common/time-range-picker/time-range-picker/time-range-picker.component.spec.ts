import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangePickerComponent } from './time-range-picker.component';

describe('TimeRangePickerComponent', () => {
  let component: TimeRangePickerComponent;
  let fixture: ComponentFixture<TimeRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeRangePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
