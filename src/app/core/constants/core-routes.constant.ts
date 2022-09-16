import { Routes } from '@angular/router';


export enum CORE_ROUTE_NAMES {
  BLANK = '',
  AUTH = 'auth',
  TRAINER_SUBMISSION = 'trainer-submission',
  OTHER = '**',
  NOT_FOUND = '404'
}

export const CORE_ROUTES: Routes = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    pathMatch: 'full',
    redirectTo: CORE_ROUTE_NAMES.TRAINER_SUBMISSION
  }, {
    path: CORE_ROUTE_NAMES.TRAINER_SUBMISSION,
    loadChildren: () => import('@app/modules/lazy/trainer-submission/trainer-submission.module').then(m => m.TrainerSubmissionModule)
  }, {
    path: CORE_ROUTE_NAMES.OTHER,
    pathMatch: 'full',
    redirectTo: CORE_ROUTE_NAMES.NOT_FOUND,
  }, {
    path: CORE_ROUTE_NAMES.NOT_FOUND,
    loadChildren: () => import('@app/modules/lazy/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];
