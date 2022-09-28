import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { AsideModule, TableModule } from '@app/modules/ui';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { AdminRoutingModule } from './admin-routing.module';
import { PAGES } from './pages';


@NgModule({
  declarations: [
    ...PAGES
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AsideModule,
    TableModule,
    SharedModule,
    CoreTranslationModule.forChild()
  ]
})
export class AdminModule { }
