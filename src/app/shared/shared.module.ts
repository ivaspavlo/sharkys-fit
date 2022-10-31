import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { CoreTranslationModule } from '@core/core-translation.module';

import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { MODALS } from './modals';


@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...MODALS
  ],
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...MODALS
  ]
})
export class SharedModule { }
