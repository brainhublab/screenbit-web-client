import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsEntryComponent } from './cms-entry/cms-entry.component';
import { AdvertisementsComponent } from './advertisements/advertisements.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { AdvertisementDetailsComponent } from './advertisement-details/advertisement-details.component';


const routes: Routes = [
  {
    path: 'cms',
    component: CmsEntryComponent,
    children: [
      {
        path: 'advertisements/create',
        component: CreateAdComponent
      },
      {
        path: 'advertisements',
        component: AdvertisementsComponent
      },
      {
        path: 'advertisements/:advertisementId',
        component: AdvertisementDetailsComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'advertisements'
      }
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
