import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { USER_ID } from '@app/core/constants';
import { IPaymentData, IResponseApi } from '@app/interfaces';
import { CoreStorageService, PaymentsService, SpinnerService } from '@core/services';
import { DestroySubscriptions } from '@app/shared/classes';
import { ToastService } from '@app/modules/ui';

import { UserService } from '../../services/user.service';
import { IUserAccount, IUserContent } from '../../interfaces';
import { ROUTE_NAMES } from '../../constants';


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
  public isRedirected = false;
  public content$: Observable<string | null>;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private translationService: TranslateService,
    private cdr: ChangeDetectorRef,
    private paymentsService: PaymentsService,
    private storageService: CoreStorageService,
    public spinnerService: SpinnerService
  ) {
    super();
  }

  ngOnInit(): void {
    // TODO: add fallback content.
    this.initContent();

    this.userService.getCachedUserData().pipe(
      tap((res: IUserAccount | null) => {
        this.isPayoutsSetup = !res?.stripe_payout_setup;
      }),
      switchMap(() => {
        return this.isPayoutsSetup ?
          this.paymentsService.getPayoutsData(this.storageService.get(USER_ID)).pipe(
            map((res: IResponseApi) => {
              if (!res.valid) {
                this.toastService.show({
                  text: res.error_message || this.translationService.instant('core.http-errors.general'),
                  type: 'warn'
                });
              }
              return res.data || [];
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

  private initContent(): void {
    this.content$ = this.userService.getCahcedPagesContent().pipe(
      map((res: IUserContent | null) => res ? res[ROUTE_NAMES.PAYMENTS] : null)
    );
  }

  public onSetupPayouts(): void {
    this.paymentsService.setupPayouts().subscribe((res: IResponseApi) => {
      if (!res.valid || !res?.data?.url) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        this.isRedirected = true;
        window.location.href = res.data.url;
      }
    });
  }

}
