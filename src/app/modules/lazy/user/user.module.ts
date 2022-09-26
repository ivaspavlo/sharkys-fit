import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { ButtonPrimaryModule, InputModule, CropperModule } from '@app/modules/ui';
import { UserRoutingModule } from './user-routing.module';
import { PAGES } from './pages';
import { PARTIALS } from './partials';
import { SERVICES } from './services';


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
    CropperModule,
    CoreTranslationModule.forChild()
  ],
  providers: [
    ...SERVICES
  ]
})
export class UserModule { }
