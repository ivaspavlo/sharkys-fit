import { Routes } from '@angular/router';
import { TrainerSubmissionComponent } from '../pages/trainer-submission/trainer-submission.component';


export enum ROUTE_NAMES {
  BLANK = ''
}

export const ROUTES: Routes = [
  {
    path: ROUTE_NAMES.BLANK,
    component: TrainerSubmissionComponent
  }
];
