import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component';


export enum MAIN_ROUTE_NAMES {
  BLANK = ''
}

export const NOT_FOUND_ROUTES: Routes = [
  {
    path: MAIN_ROUTE_NAMES.BLANK,
    component: NotFoundPageComponent
  }
];
