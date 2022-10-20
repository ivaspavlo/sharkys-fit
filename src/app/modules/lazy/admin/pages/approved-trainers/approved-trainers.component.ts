import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseApi, IUserAccount } from '@app/interfaces';
import { TrainerType } from '../../constants';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-approved-trainers',
  templateUrl: './approved-trainers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovedTrainersComponent implements OnInit {

  public type: TrainerType = 'approved';
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
