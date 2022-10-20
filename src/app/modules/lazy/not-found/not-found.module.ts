import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTranslationModule } from '@core/core-translation.module';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { PAGES } from './pages';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    ...PAGES
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    SharedModule,
    CoreTranslationModule.forChild()
  ]
})
export class NotFoundModule { }
