import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VbarChartComponent } from './vbar-chart/vbar-chart.component';
import { DetailedPieChartComponent } from './detailed-pie-chart/detailed-pie-chart.component';
import { CalendarChartComponent } from './calendar-chart/calendar-chart.component';
import { TreeMapChartComponent } from './tree-map-chart/tree-map-chart.component';
import { SofiaSvgMapComponent } from './sofia-svg-map/sofia-svg-map.component';
import { SofiaSvgMapModule } from './sofia-svg-map/sofia-svg-map.module';
import { RetentionChartComponent } from './retention-chart/retention-chart.component';

const moduleSharedComponents = [
  LineChartComponent,
  VbarChartComponent,
  DetailedPieChartComponent,
  CalendarChartComponent,
  TreeMapChartComponent,
  RetentionChartComponent,
];

@NgModule({
  declarations: [
    ...moduleSharedComponents,
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    SofiaSvgMapModule
  ],
  exports: [
    ...moduleSharedComponents,
    SofiaSvgMapModule
  ]
})
export class ChartsModule { }
