import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component';


export enum ROUTE_NAMES {
  BLANK = ''
}

export const ROUTES: Routes = [
  {
    path: ROUTE_NAMES.BLANK,
    component: NotFoundPageComponent
  }
];
