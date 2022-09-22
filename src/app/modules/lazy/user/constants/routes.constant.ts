import { Routes } from '@angular/router';
import { UserComponent } from '../pages/user/user.component';
import { AccountComponent } from '../pages/account/account.component';


export enum ROUTE_NAMES {
  BLANK = '',
  ACCOUNT = 'account',
  PAYMENT = 'payment',
  AVATAR = 'avatar',
  GETTING_STARTED = 'getting-started',
  EARNINGS_INFO = 'earnings-info',
  ORDER_INFO = 'order-info',
  PROMOTIONS = 'promotions',
  CONTACT = 'contact'
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
