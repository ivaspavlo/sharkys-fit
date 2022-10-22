import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryModule } from '../button-primary/button-primary.module';
import { IconModule } from '../icon/icon.module';
import { COMPONENTS } from './components';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ButtonPrimaryModule,
    IconModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class AsideModule { }
