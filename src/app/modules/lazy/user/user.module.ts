import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { InputModule, CropperModule, DialogModule, ButtonPrimaryModule, AsideModule } from '@app/modules/ui';
import { UserRoutingModule } from './user-routing.module';
import { PAGES } from './pages';
import { PARTIALS } from './partials';
import { SERVICES } from './services';
import { MODALS } from './modals';


@NgModule({
  declarations: [
    ...PAGES,
    ...PARTIALS,
    ...MODALS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    ButtonPrimaryModule,
    InputModule,
    CropperModule,
    DialogModule,
    AsideModule,
    CoreTranslationModule.forChild()
  ],
  providers: [
    ...SERVICES
  ]
})
export class UserModule { }
