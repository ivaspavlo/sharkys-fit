import { Routes } from '@angular/router';


export enum CORE_ROUTE_NAMES {
  BLANK = '',
  AUTH = 'auth',
  USER = 'user',
  ADMIN = 'admin',
  OTHER = '**',
  NOT_FOUND = '404'
}

export const CORE_ROUTES: Routes = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    pathMatch: 'full',
    redirectTo: CORE_ROUTE_NAMES.AUTH
  }, {
    path: CORE_ROUTE_NAMES.AUTH,
    loadChildren: () => import('@app/modules/lazy/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: CORE_ROUTE_NAMES.USER,
    loadChildren: () => import('@app/modules/lazy/user/user.module').then(m => m.UserModule)
  }, {
    path: CORE_ROUTE_NAMES.ADMIN,
    loadChildren: () => import('@app/modules/lazy/admin/admin.module').then(m => m.AdminModule)
  }, {
    path: CORE_ROUTE_NAMES.OTHER,
    pathMatch: 'full',
    redirectTo: CORE_ROUTE_NAMES.NOT_FOUND,
  }, {
    path: CORE_ROUTE_NAMES.NOT_FOUND,
    loadChildren: () => import('@app/modules/lazy/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];
