import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPieChartComponent } from './detailed-pie-chart.component';

describe('DetailedPieChartComponent', () => {
  let component: DetailedPieChartComponent;
  let fixture: ComponentFixture<DetailedPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
