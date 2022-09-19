import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreTranslationModule } from '@app/core/core-translation.module';
import { SharedModule } from '@app/shared/shared.module';
import { ButtonPrimaryModule, InputModule, SelectModule, ToastModule } from '@app/modules/ui';

import { AuthRoutingModule } from './auth-routing.module';
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
    AuthRoutingModule,
    InputModule,
    SelectModule,
    ButtonPrimaryModule,
    ToastModule,
    CoreTranslationModule.forChild()
  ],
  providers: [
    ...SERVICES
  ]
})
export class AuthModule { }
