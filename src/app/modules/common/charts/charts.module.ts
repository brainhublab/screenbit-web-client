import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VbarChartComponent } from './vbar-chart/vbar-chart.component';
import { DetailedPieChartComponent } from './detailed-pie-chart/detailed-pie-chart.component';
import { CalendarChartComponent } from './calendar-chart/calendar-chart.component';
import { TreeMapChartComponent } from './tree-map-chart/tree-map-chart.component';
import { SofiaSvgMapComponent } from './sofia-svg-map/sofia-svg-map.component';

const moduleSharedComponents = [
  LineChartComponent,
  VbarChartComponent,
  DetailedPieChartComponent,
  CalendarChartComponent,
  TreeMapChartComponent,
  SofiaSvgMapComponent,
];

@NgModule({
  declarations: [
    ...moduleSharedComponents,
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
  ],
  exports: [
    ...moduleSharedComponents
  ]
})
export class ChartsModule { }
