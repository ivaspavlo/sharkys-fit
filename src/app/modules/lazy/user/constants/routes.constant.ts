import { Routes } from '@angular/router';
import { UserComponent } from '../pages/user/user.component';
import { AccountComponent } from '../pages/account/account.component';
import { PaymentsComponent } from '../pages/payments/payments.component';
import { GettingStartedComponent } from '../pages/getting-started/getting-started.component';
import { EarningsInfoComponent } from '../pages/earnings-info/earnings-info.component';
import { OrdersInfoComponent } from '../pages/orders-info/orders-info.component';
import { PromotionsComponent } from '../pages/promotions/promotions.component';
import { ContactsComponent } from '../pages/contacts/contacts.component';


export enum ROUTE_NAMES {
  BLANK = '',
  ACCOUNT = 'account',
  PAYMENTS = 'payments',
  AVATAR = 'avatar',
  GETTING_STARTED = 'getting-started',
  EARNINGS_INFO = 'earnings-info',
  ORDERS_INFO = 'orders-info',
  PROMOTIONS = 'promotions',
  CONTACTS = 'contacts'
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
      }, {
        path: ROUTE_NAMES.PAYMENTS,
        component: PaymentsComponent
      }, {
        path: ROUTE_NAMES.GETTING_STARTED,
        component: GettingStartedComponent
      }, {
        path: ROUTE_NAMES.EARNINGS_INFO,
        component: EarningsInfoComponent
      }, {
        path: ROUTE_NAMES.ORDERS_INFO,
        component: OrdersInfoComponent
      }, {
        path: ROUTE_NAMES.PROMOTIONS,
        component: PromotionsComponent
      }, {
        path: ROUTE_NAMES.CONTACTS,
        component: ContactsComponent
      }
    ]
  }
];
