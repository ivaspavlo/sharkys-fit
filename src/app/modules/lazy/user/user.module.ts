import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { UserRoutingModule } from './user-routing.module';
import { PAGES } from './pages';
import { PARTIALS } from './partials';


@NgModule({
  declarations: [
    ...PAGES,
    ...PARTIALS
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    CoreTranslationModule.forChild()
  ]
})
export class UserModule { }
