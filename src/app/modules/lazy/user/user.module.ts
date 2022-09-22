import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { UserRoutingModule } from './user-routing.module';
import { ButtonPrimaryModule, InputModule } from '@app/modules/ui';
import { PAGES } from './pages';
import { PARTIALS } from './partials';


@NgModule({
  declarations: [
    ...PAGES,
    ...PARTIALS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    ButtonPrimaryModule,
    InputModule,
    CoreTranslationModule.forChild()
  ]
})
export class UserModule { }
