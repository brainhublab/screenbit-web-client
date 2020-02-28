import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsEntryComponent } from './cms-entry/cms-entry.component';
import { SourcesComponent } from './sources/sources.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { SourceDetailsComponent } from './source-details/source-details.component';


const routes: Routes = [
  {
    path: 'cms',
    component: CmsEntryComponent,
    children: [
      {
        path: 'sources/create',
        component: CreateAdComponent
      },
      {
        path: 'sources',
        component: SourcesComponent
      },
      {
        path: 'sources/:sourceId',
        component: SourceDetailsComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sources'
      }
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
