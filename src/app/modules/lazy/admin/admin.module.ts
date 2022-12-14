import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { AsideModule, ButtonPrimaryModule, TableModule, SpinnerModule, ToastModule, InputModule, DialogModule } from '@app/modules/ui';
import { CoreTranslationModule } from '@core/core-translation.module';

import { AdminRoutingModule } from './admin-routing.module';
import { PAGES } from './pages';
import { PARTIALS } from './partials';
import { SERVICES } from './services';
import { GUARDS } from './guards';


@NgModule({
  declarations: [
    ...PAGES,
    ...PARTIALS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AsideModule,
    TableModule,
    ButtonPrimaryModule,
    SpinnerModule,
    ToastModule,
    SharedModule,
    InputModule,
    DialogModule,
    CoreTranslationModule.forChild()
  ],
  providers: [
    ...SERVICES,
    ...GUARDS
  ]
})
export class AdminModule { }
