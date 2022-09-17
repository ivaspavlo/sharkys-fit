import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreTranslationModule } from '@app/core/core-translation.module';
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
    CoreTranslationModule.forChild()
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
