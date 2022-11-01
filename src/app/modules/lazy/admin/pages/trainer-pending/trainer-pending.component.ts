import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IUserAccount } from '@app/interfaces';
import { SpinnerService } from '@core/services';
import { IResponseApi } from '@app/interfaces';
import { ConfirmModalComponent } from '@app/shared/modals';
import { DestroySubscriptions } from '@app/shared/classes';
import { DialogService, ToastService } from '@app/modules/ui';
import { AdminService } from '../../services/admin.service';
import { ROUTE_NAMES } from '../../constants';


@Component({
  selector: 'app-trainer-pending',
  templateUrl: './trainer-pending.component.html',
  styleUrls: ['./trainer-pending.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerPendingComponent extends DestroySubscriptions implements OnInit {

  public trainer$: Observable<IUserAccount | true>;
  public isLoaded = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private translationService: TranslateService,
    private router: Router,
    private dialogService: DialogService,
    public spinnerService: SpinnerService
  ) {
    super();
  }

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

  public onClick(trainer: IUserAccount, isApproved: boolean): void {
    const req: Observable<IResponseApi> = isApproved ?
      this.adminService.approveTrainer(trainer.id) :
      this.adminService.cancelTrainer(trainer.id);
    const successMessage = isApproved ?
      'admin.messages.trainer-approved' :
      'admin.messages.trainer-cancelled';
    if (isApproved) {
      return this.executeTrainerAction(req, successMessage)
    }
    this.dialogService.open(ConfirmModalComponent, {title: 'admin.modal-cancel-title', icon: 'question'}).afterClosed.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((res: boolean | undefined) => {
      if (!!res) {
        this.executeTrainerAction(req, successMessage);
      }
    });
  }

  private executeTrainerAction(req: Observable<IResponseApi>, successMessage: string): void {
    req.subscribe((res: IResponseApi) => {
      if (!res.valid) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        this.toastService.show({
          text: this.translationService.instant(successMessage),
          type: 'success'
        });
        this.router.navigateByUrl(`/admin/${ROUTE_NAMES.PENDING}`);
      }
    });
  }

}
