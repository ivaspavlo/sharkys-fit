import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CORE_ROUTES } from './constants/core-routes.constant';


@NgModule({
  imports: [
    RouterModule.forRoot(CORE_ROUTES, { scrollPositionRestoration: 'top' })
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule {}
