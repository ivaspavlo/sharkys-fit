import { Routes } from '@angular/router';


export enum CORE_ROUTE_NAMES {
  BLANK = '',
  AUTH = 'auth',
  MAIN = 'main',
  OTHER = '**',
  NOT_FOUND = '404'
}

export const CORE_ROUTES: Routes = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    pathMatch: 'full',
    redirectTo: CORE_ROUTE_NAMES.MAIN
  }, {
    path: CORE_ROUTE_NAMES.OTHER,
    pathMatch: 'full',
    redirectTo: CORE_ROUTE_NAMES.NOT_FOUND,
  }, {
    path: CORE_ROUTE_NAMES.NOT_FOUND,
    loadChildren: () => import('@app/modules/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];
