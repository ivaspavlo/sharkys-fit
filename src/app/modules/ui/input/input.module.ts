import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreTranslationModule } from '@app/core/core-translation.module';

import { InputComponent } from './container/input.component';
import { PARTIALS } from './partials';
import { PIPES } from './pipes';


@NgModule({
  declarations: [
    InputComponent,
    ...PIPES,
    ...PARTIALS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    InputComponent
  ]
})
export class InputModule { }
