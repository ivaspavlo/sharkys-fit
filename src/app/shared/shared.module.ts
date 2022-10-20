import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { CoreTranslationModule } from '@core/core-translation.module';
import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';


@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
