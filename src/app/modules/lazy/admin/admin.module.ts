import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { AsideModule, ButtonPrimaryModule, TableModule } from '@app/modules/ui';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { AdminRoutingModule } from './admin-routing.module';
import { PAGES } from './pages';
import { PARTIALS } from './partials';


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
    SharedModule,
    CoreTranslationModule.forChild()
  ]
})
export class AdminModule { }
