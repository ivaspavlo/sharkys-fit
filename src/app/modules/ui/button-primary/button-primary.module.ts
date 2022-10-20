import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreTranslationModule } from '@core/core-translation.module';
import { SpinnerModule } from '../spinner/spinner.module';
import { COMPONENTS } from './components';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    SpinnerModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ButtonPrimaryModule { }
