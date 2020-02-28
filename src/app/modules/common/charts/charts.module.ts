import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart/line-chart.component';
// import { ViserModule } from 'viser-ng';



@NgModule({
  declarations: [LineChartComponent],
  imports: [
    CommonModule,
    // ViserModule
  ],
  exports: [
    LineChartComponent
  ]
})
export class ChartsModule { }
