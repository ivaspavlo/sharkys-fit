import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryModule } from '../button-primary/button-primary.module';
import { COMPONENTS } from './components';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ButtonPrimaryModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class AsideModule { }
