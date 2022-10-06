import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { CoreTranslationModule } from './core-translation.module';
import { CORE_PROVIDERS } from './providers';
import { CORE_INTERCEPTORS } from './interceptors';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    CoreTranslationModule.forRoot()
  ],
  providers: [
    ...CORE_PROVIDERS,
    ...CORE_INTERCEPTORS
  ],
  exports: [
    CoreRoutingModule
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import available only in AppModule');
    }
  }
}
