import { Routes } from '@angular/router';
import { UserComponent } from '../pages/user/user.component';
import { AccountComponent } from '../pages/account/account.component';


export enum ROUTE_NAMES {
  BLANK = '',
  ACCOUNT = 'account'
}

export const ROUTES: Routes = [
  {
    path: ROUTE_NAMES.BLANK,
    component: UserComponent,
    children: [
      {
        path: ROUTE_NAMES.BLANK,
        pathMatch: 'full',
        redirectTo: ROUTE_NAMES.ACCOUNT
      }, {
        path: ROUTE_NAMES.ACCOUNT,
        component: AccountComponent
      }
    ]
  }
];
