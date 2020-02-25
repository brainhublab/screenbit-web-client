import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { NzResultModule, NzButtonModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzResultModule
  ],
  exports: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
