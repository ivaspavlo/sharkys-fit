import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { WINDOW } from '@app/core/providers';
import { SpinnerService } from '@app/core/services';
import { DestroySubscriptions } from '@app/shared/classes';
import { ToastService } from '@app/modules/ui/toast';
import { UserService } from '../../services/user.service';
import { IPaymentData, IUserAccount } from '../../interfaces';
import { IResponseApi } from '@app/core/interfaces';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent extends DestroySubscriptions implements OnInit {

  public payouts$ = new BehaviorSubject<IPaymentData[]>([]);
  public isPayoutsSetup = false;
  public isLoading = true;

  constructor(
    @Inject(WINDOW) private window: Window,
    private userService: UserService,
    private toastService: ToastService,
    private translationService: TranslateService,
    private cdr: ChangeDetectorRef,
    public spinnerService: SpinnerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.getCachedUserData().pipe(
      tap((res: IUserAccount | null) => {
        this.isPayoutsSetup = !!res?.stripe_payout_setup;
      }),
      switchMap(() => {
        return this.isPayoutsSetup ?
          this.userService.getPayoutsData().pipe(
            map((res: IResponseApi) => {
              return res.data;
            })
          ) : of([]);
      }),
      tap((res: IPaymentData[]) => {
        this.payouts$.next(res);
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
      takeUntil(this.componentDestroyed$)
    ).subscribe();
  }

  public onSetupPayouts(): void {
    this.userService.setupPayouts().subscribe((res: IResponseApi) => {
      if (!res.valid || !res?.data?.url) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        this.window.open(res.data.url);
      }
    });
  }

}
