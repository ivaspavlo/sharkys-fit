import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { PAGES } from './pages';


@NgModule({
  declarations: [
    ...PAGES
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    CoreTranslationModule.forChild()
  ]
})
export class NotFoundModule { }
