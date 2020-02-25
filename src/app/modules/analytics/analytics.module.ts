import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsEntryComponent } from './analytics-entry/analytics-entry.component';
import { NzLayoutModule, NzMenuModule, NzIconModule, NzCardModule, NzGridModule } from 'ng-zorro-antd';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [AnalyticsEntryComponent, DashboardComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzCardModule,
    NzGridModule
  ]
})
export class AnalyticsModule { }
