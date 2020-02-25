import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsEntryComponent } from './cms-entry/cms-entry.component';


const routes: Routes = [
  {
    path: 'cms',
    component: CmsEntryComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
