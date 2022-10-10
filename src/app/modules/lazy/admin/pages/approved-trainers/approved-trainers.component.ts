import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IResponseApi } from '@app/core/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainerType } from '../../constants';
import { ITrainer } from '../../interfaces';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-approved-trainers',
  templateUrl: './approved-trainers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovedTrainersComponent implements OnInit {

  public type: TrainerType = 'approved';
  public trainers$: Observable<ITrainer[]>;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.trainers$ = this.adminService.getTrainers(this.type).pipe(
      map((res: IResponseApi) => res.data)
    );
  }

}
