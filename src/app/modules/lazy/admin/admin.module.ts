import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { AsideModule } from '@app/modules/ui';
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
    SharedModule
  ]
})
export class AdminModule { }
