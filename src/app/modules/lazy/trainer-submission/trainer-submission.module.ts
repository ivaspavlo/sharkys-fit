import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreTranslationModule } from '@app/core/core-translation.module';
import { SharedModule } from '@app/shared/shared.module';
import { ButtonPrimaryModule, InputModule, SelectModule } from '@app/modules/ui';

import { TrainerSubmissionRoutingModule } from './trainer-submission-routing.module';
import { PAGES } from './pages';
import { SERVICES } from './services';


@NgModule({
  declarations: [
    ...PAGES
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TrainerSubmissionRoutingModule,
    InputModule,
    SelectModule,
    ButtonPrimaryModule,
    CoreTranslationModule.forChild()
  ],
  providers: [
    ...SERVICES
  ]
})
export class TrainerSubmissionModule { }
