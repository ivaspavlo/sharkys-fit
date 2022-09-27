import { Routes } from '@angular/router';
import { AdminComponent } from '../pages/admin/admin.component';
import { ApprovedTrainersComponent } from '../pages/approved-trainers/approved-trainers.component';
import { PendingTrainersComponent } from '../pages/pending-trainers/pending-trainers.component';


export enum ROUTE_NAMES {
  BLANK = '',
  APPROVED = 'approved-trainers',
  PENDING = 'pending-trainers'
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
        component: ApprovedTrainersComponent
      }, {
        path: ROUTE_NAMES.PENDING,
        component: PendingTrainersComponent
      }
    ]
  }
];
