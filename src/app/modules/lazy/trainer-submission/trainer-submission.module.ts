import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreTranslationModule } from '@app/core/core-translation.module';
import { InputModule } from '@app/modules/ui';

import { TrainerSubmissionRoutingModule } from './trainer-submission-routing.module';
import { PAGES } from './pages';


@NgModule({
  declarations: [
    ...PAGES
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrainerSubmissionRoutingModule,
    InputModule,
    CoreTranslationModule.forChild()
  ]
})
export class TrainerSubmissionModule { }
