import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IUserAccount, IResponseApi } from '@app/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainerType } from '../../constants';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-pending-trainers',
  templateUrl: './pending-trainers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendingTrainersComponent implements OnInit {

  public type: TrainerType = 'new';
  public trainers$: Observable<IUserAccount[]>;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.trainers$ = this.adminService.getTrainers(this.type).pipe(
      map((res: IResponseApi) => res.data)
    );
  }

}
