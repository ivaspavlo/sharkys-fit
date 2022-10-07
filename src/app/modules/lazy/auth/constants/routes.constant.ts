import { Routes } from '@angular/router';
import { FirstLoginComponent } from '../pages/first-login/first-login.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { LoginComponent } from '../pages/login/login.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { TrainerSubmissionComponent } from '../pages/trainer-submission/trainer-submission.component';
import { AuthComponent } from '../pages/auth/auth.component';


export enum ROUTE_NAMES {
  BLANK = '',
  TRAINER_SUBMISSION = 'register',
  FIRST_LOGIN = 'first-login/:firstToken',
  LOGIN = 'login',
  REMIND_PASSWORD = 'remind-password',
  RESET_PASSWORD = 'reset-password/:resetToken'
}

export const ROUTES: Routes = [
  {
    path: ROUTE_NAMES.BLANK,
    component: AuthComponent,
    children: [
      {
        path: ROUTE_NAMES.BLANK,
        pathMatch: 'full',
        redirectTo: ROUTE_NAMES.LOGIN
      }, {
        path: ROUTE_NAMES.TRAINER_SUBMISSION,
        component: TrainerSubmissionComponent,
        data: { animation: ROUTE_NAMES.TRAINER_SUBMISSION }
      }, {
        path: ROUTE_NAMES.LOGIN,
        component: LoginComponent,
        data: { animation: ROUTE_NAMES.LOGIN }
      }, {
        path: ROUTE_NAMES.REMIND_PASSWORD,
        component: ForgotPasswordComponent,
        data: { animation: ROUTE_NAMES.REMIND_PASSWORD }
      }, {
        path: ROUTE_NAMES.FIRST_LOGIN,
        component: FirstLoginComponent,
        data: { animation: ROUTE_NAMES.FIRST_LOGIN }
      }, {
        path: ROUTE_NAMES.RESET_PASSWORD,
        component: ResetPasswordComponent,
        data: { animation: ROUTE_NAMES.RESET_PASSWORD }
      }
    ]
  }
];
