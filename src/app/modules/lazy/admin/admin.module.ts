import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { AsideModule, ButtonPrimaryModule, TableModule, SpinnerModule, ToastModule } from '@app/modules/ui';
import { CoreTranslationModule } from '@core/core-translation.module';
import { AdminRoutingModule } from './admin-routing.module';
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
    AdminRoutingModule,
    AsideModule,
    TableModule,
    ButtonPrimaryModule,
    SpinnerModule,
    ToastModule,
    SharedModule,
    CoreTranslationModule.forChild()
  ],
  providers: [
    ...SERVICES
  ]
})
export class AdminModule { }
