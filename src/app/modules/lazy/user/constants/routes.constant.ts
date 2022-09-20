import { Routes } from '@angular/router';
import { UserComponent } from '../pages/user/user.component';


export enum ROUTE_NAMES {
  BLANK = ''
}

export const ROUTES: Routes = [
  {
    path: ROUTE_NAMES.BLANK,
    component: UserComponent
  }
];
