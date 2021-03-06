import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { CmsEntryComponent } from './cms-entry/cms-entry.component';
import {
  NzLayoutModule,
  NzMenuModule,
  NzIconModule,
  NzCardModule,
  NzGridModule,
  NzListModule,
  NzFormModule,
  NzButtonModule,
  NzInputModule,
  NzUploadModule,
  NzMessageModule,
  NzTimePickerModule,
  NzDatePickerModule,
  NzDescriptionsModule,
  NzAvatarModule,
  NzTagModule,
  NzToolTipModule,
  NzPopconfirmModule,
  NzDividerModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzSliderModule,
  NzInputNumberModule
} from 'ng-zorro-antd';
import { AdvertisementsComponent } from './advertisements/advertisements.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeRangePickerModule } from '../common/time-range-picker/time-range-picker.module';
import { AdvertisementDetailsComponent } from './advertisement-details/advertisement-details.component';
import { SofiaSvgMapModule } from '../common/charts/sofia-svg-map/sofia-svg-map.module';


@NgModule({
  declarations: [CmsEntryComponent, AdvertisementsComponent, CreateAdComponent, AdvertisementDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CmsRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
    NzListModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzUploadModule,
    NzMessageModule,
    NzTimePickerModule,
    TimeRangePickerModule,
    NzDatePickerModule,
    NzDescriptionsModule,
    NzAvatarModule,
    NzTagModule,
    NzToolTipModule,
    NzPopconfirmModule,
    NzDividerModule,
    NzSelectModule,
    NzPageHeaderModule,
    NzSliderModule,
    NzInputNumberModule,
    SofiaSvgMapModule
  ]
})
export class CmsModule { }
