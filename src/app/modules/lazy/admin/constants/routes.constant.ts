import { Routes } from '@angular/router';
import { AdminComponent } from '../pages/admin/admin.component';
import { ApprovedTrainersComponent } from '../pages/approved-trainers/approved-trainers.component';
import { PendingTrainersComponent } from '../pages/pending-trainers/pending-trainers.component';
import { TrainerApprovedComponent } from '../pages/trainer-approved/trainer-approved.component';
import { TrainerPendingComponent } from '../pages/trainer-pending/trainer-pending.component';


export enum ROUTE_NAMES {
  BLANK = '',
  APPROVED = 'trainers/approved',
  PENDING = 'trainers/pending',
  TRAINER = 'trainer/:id'
}

export const ROUTES: Routes = [
  {
    path: ROUTE_NAMES.BLANK,
    component: AdminComponent,
    children: [
      {
        path: ROUTE_NAMES.BLANK,
        pathMatch: 'full',
        redirectTo: ROUTE_NAMES.APPROVED
      }, {
        path: ROUTE_NAMES.APPROVED,
        children: [
          {
            path: ROUTE_NAMES.BLANK,
            pathMatch: 'full',
            component: ApprovedTrainersComponent
          }, {
            path: ROUTE_NAMES.TRAINER,
            component: TrainerApprovedComponent
          }
        ]
      }, {
        path: ROUTE_NAMES.PENDING,
        children: [
          {
            path: ROUTE_NAMES.BLANK,
            pathMatch: 'full',
            component: PendingTrainersComponent
          }, {
            path: ROUTE_NAMES.TRAINER,
            component: TrainerPendingComponent
          }
        ]
      }
    ]
  }
];
