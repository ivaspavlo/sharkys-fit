import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-approved-trainers',
  templateUrl: './approved-trainers.component.html',
  styleUrls: ['./approved-trainers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovedTrainersComponent implements OnInit {

  public trainers$: Observable<any[]>;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.trainers$ = this.adminService.getTrainers(true);
  }

}
