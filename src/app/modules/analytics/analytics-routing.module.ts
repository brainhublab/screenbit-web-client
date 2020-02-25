import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsEntryComponent } from './analytics-entry/analytics-entry.component';


const routes: Routes = [
  {
    path: 'analytics',
    component: AnalyticsEntryComponent,
    children: [],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
