import { Routes } from '@angular/router';
import { FirstLoginComponent } from '../pages/first-login/first-login.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { LoginComponent } from '../pages/login/login.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { TrainerSubmissionComponent } from '../pages/trainer-submission/trainer-submission.component';


export enum ROUTE_NAMES {
  BLANK = '',
  TRAINER_SUBMISSION = 'register',
  FIRST_LOGIN = 'first-login',
  LOGIN = 'login',
  FORGOT_PASSWORD = 'forgot-password',
  RESET_PASSWORD = 'reset-password'
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
  }, {
    path: ROUTE_NAMES.LOGIN,
    component: LoginComponent
  }, {
    path: ROUTE_NAMES.FORGOT_PASSWORD,
    component: ForgotPasswordComponent
  }, {
    path: ROUTE_NAMES.RESET_PASSWORD,
    component: ResetPasswordComponent
  }
];
