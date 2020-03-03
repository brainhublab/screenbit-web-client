import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsEntryComponent } from './analytics-entry/analytics-entry.component';
import { NzLayoutModule, NzMenuModule, NzIconModule, NzCardModule, NzGridModule, NzSelectModule } from 'ng-zorro-antd';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from '../common/charts/charts.module';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';
import { AdStatsComponent } from './ad-stats/ad-stats.component';


@NgModule({
  declarations: [AnalyticsEntryComponent, DashboardComponent, SummaryComponent, AdStatsComponent],
  imports: [
    CommonModule,
    FormsModule,
    AnalyticsRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
    NzSelectModule,
    ChartsModule
  ]
})
export class AnalyticsModule { }
