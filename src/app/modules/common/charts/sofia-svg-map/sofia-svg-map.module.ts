import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SofiaSvgMapComponent } from './sofia-svg-map.component';
import { NzIconModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [SofiaSvgMapComponent],
  imports: [
    CommonModule,
    NzIconModule
  ],
  exports: [
    SofiaSvgMapComponent
  ]
})
export class SofiaSvgMapModule { }
