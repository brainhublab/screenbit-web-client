import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionChartComponent } from './retention-chart.component';

describe('RetentionChartComponent', () => {
  let component: RetentionChartComponent;
  let fixture: ComponentFixture<RetentionChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetentionChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetentionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
