import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreTranslationModule } from '@core/core-translation.module';
import { SharedModule } from '@app/shared/shared.module';
import { ButtonPrimaryModule, InputModule, SelectModule, ToastModule } from '@app/modules/ui';

import { AuthRoutingModule } from './auth-routing.module';
import { PAGES } from './pages';
import { PARTIALS } from './partials';


@NgModule({
  declarations: [
    ...PAGES,
    ...PARTIALS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule,
    InputModule,
    SelectModule,
    ButtonPrimaryModule,
    ToastModule,
    CoreTranslationModule.forChild()
  ]
})
export class AuthModule { }
