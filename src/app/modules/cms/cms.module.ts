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
import { SourcesComponent } from './sources/sources.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeRangePickerModule } from '../common/time-range-picker/time-range-picker.module';
import { SourceDetailsComponent } from './source-details/source-details.component';
import { SofiaSvgMapModule } from '../common/charts/sofia-svg-map/sofia-svg-map.module';
import { AreasSelectorComponent } from './areas-selector/areas-selector.component';


@NgModule({
  declarations: [CmsEntryComponent, SourcesComponent, CreateAdComponent, SourceDetailsComponent, AreasSelectorComponent],
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
