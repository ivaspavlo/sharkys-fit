import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTranslationModule } from '@app/core/core-translation.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreTranslationModule.forChild()
  ],
  exports: []
})
export class SharedModule { }
