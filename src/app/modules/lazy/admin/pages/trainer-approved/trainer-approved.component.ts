import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { PaymentsService, SpinnerService } from '@core/services';
import { IPaymentData, IUserAccount, IResponseApi } from '@app/interfaces';
import { ConfirmModalComponent } from '@app/shared/modals';
import { DestroySubscriptions } from '@app/shared/classes';
import { DialogService, ToastService } from '@app/modules/ui';

import { CtrlPanelButtons, ROUTE_NAMES } from '../../constants';
import { ICtrlPanelButton } from '../../interfaces';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-trainer-approved',
  templateUrl: './trainer-approved.component.html',
  styleUrls: ['./trainer-approved.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerApprovedComponent extends DestroySubscriptions implements OnInit {

  public trainer$: Observable<IUserAccount | true>;
  public payments$: Observable<IPaymentData[]>;
  public buttons: ICtrlPanelButton[] = CtrlPanelButtons;
  public current: ICtrlPanelButton = this.buttons[0];
  public isLoaded = false;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private translationService: TranslateService,
    private router: Router,
    private paymentsService: PaymentsService,
    private dialogService: DialogService,
    public spinnerService: SpinnerService
  ) {
    super();
  }

  ngOnInit(): void {
    const trainerId = this.activatedRoute.snapshot.params.id;
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
    this.payments$ = this.paymentsService.getPayoutsData(trainerId).pipe(
      map((res: IResponseApi) => res.data)
    );
  }

  public onCancelTrainer(trainer: IUserAccount): void {
    this.dialogService.open(ConfirmModalComponent, {title: 'admin.modal-cancel-title', icon: 'question'}).afterClosed.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((res: boolean | undefined) => {
      if (!res) {
        return;
      }
      this.cancelTrainer(trainer.id);
    });
  }

  private cancelTrainer(trainerId: string): void {
    this.adminService.cancelTrainer(trainerId).subscribe((res: IResponseApi) => {
      if (!res.valid) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        this.toastService.show({
          text: this.translationService.instant('admin.messages.trainer-cancelled'),
          type: 'success'
        });
        this.router.navigateByUrl(`/admin/${ROUTE_NAMES.APPROVED}`);
      }
    });
  }

}
