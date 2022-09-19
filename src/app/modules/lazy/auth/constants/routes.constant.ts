import { Routes } from '@angular/router';
import { FirstLoginComponent } from '../pages/first-login/first-login.component';
import { TrainerSubmissionComponent } from '../pages/trainer-submission/trainer-submission.component';


export enum ROUTE_NAMES {
  BLANK = '',
  TRAINER_SUBMISSION = 'register',
  FIRST_LOGIN = 'first-login'
}

export const ROUTES: Routes = [
  {
    path: ROUTE_NAMES.BLANK,
    pathMatch: 'full',
    redirectTo: ROUTE_NAMES.TRAINER_SUBMISSION
  }, {
    path: ROUTE_NAMES.TRAINER_SUBMISSION,
    component: TrainerSubmissionComponent
  }, {
    path: ROUTE_NAMES.FIRST_LOGIN,
    component: FirstLoginComponent
  }
];
