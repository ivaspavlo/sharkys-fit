import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IUserAccount } from '@app/interfaces';
import { SpinnerService } from '@core/services';
import { IResponseApi } from '@app/interfaces';
import { ToastService } from '@app/modules/ui';
import { AdminService } from '../../services/admin.service';
import { ROUTE_NAMES } from '../../constants';


@Component({
  selector: 'app-trainer-pending',
  templateUrl: './trainer-pending.component.html',
  styleUrls: ['./trainer-pending.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerPendingComponent implements OnInit {

  public trainer$: Observable<IUserAccount | true>;
  public isLoaded = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private translationService: TranslateService,
    private router: Router,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    const trainerId = this.route.snapshot.params.id;
    this.trainer$ = this.adminService.getSingleTrainer(trainerId).pipe(
      map((res: IResponseApi) => {
        this.isLoaded = true;
        if (!res.valid) {
          this.toastService.show({
            text: this.translationService.instant('core.http-errors.general'),
            type: 'warn'
          });
          return true;
        }
        return res.data;
      })
    );
  }

  public onApproveReject(trainer: IUserAccount, isApproved: boolean): void {
    const req: Observable<IResponseApi> = isApproved ?
      this.adminService.approveTrainer(trainer.id) :
      this.adminService.cancelTrainer(trainer.id);
    req.subscribe((res: IResponseApi) => {
      if (!res.valid) {
        this.toastService.show({
          text: this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        const message = isApproved ? 'admin.messages.trainer-approved' : 'admin.messages.trainer-cancelled';
        this.toastService.show({
          text: this.translationService.instant(message),
          type: 'success'
        });
        this.router.navigateByUrl(`/admin/${ROUTE_NAMES.PENDING}`);
      }
    });
  }

}
