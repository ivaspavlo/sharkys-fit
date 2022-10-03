import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { AsideModule, ButtonPrimaryModule, TableModule, SpinnerModule } from '@app/modules/ui';
import { CoreTranslationModule } from '@app/core/core-translation.module';
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
    SharedModule,
    CoreTranslationModule.forChild()
  ],
  providers: [
    ...SERVICES
  ]
})
export class AdminModule { }
