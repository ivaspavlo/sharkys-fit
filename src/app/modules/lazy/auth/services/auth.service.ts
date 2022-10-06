import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { CoreStorageService, SpinnerService } from '@app/core/services';
import { ACCESS_TOKEN, IS_ADMIN } from '@app/core/constants';
import { ApiService } from '@app/shared/classes';
import { IFirstLoginReq, ILoginReq, IRemindPasswordReq, IResetPasswordReq, ISubmitTrainerReq } from '../interfaces';


@Injectable()
export class AuthService extends ApiService {

  constructor(
    protected injector: Injector,
    private spinnerService: SpinnerService,
    private storageService: CoreStorageService
  ) {
    super(injector);
  }

  public submitTrainerData(value: ISubmitTrainerReq): Observable<boolean> {
    this.spinnerService.on();
    return this.post<any>('signup', value).pipe(
      map(() => true),
      catchError(() => of(false)),
      delay(1000),
      tap(() => this.spinnerService.off())
    );
  }

  public firstLogin(value: IFirstLoginReq): Observable<boolean> {
    this.spinnerService.on();
    return this.post<any>('accounts', value).pipe(
      map(() => true),
      catchError(() => of(true)),
      delay(1000),
      tap(this.afterLogin.bind(this))
    );
  }

  public login(value: ILoginReq): Observable<boolean> {
    this.spinnerService.on();
    return this.post<any>('login', value).pipe(
      map(() => true),
      catchError(() => of(true)),
      delay(1000),
      tap(this.afterLogin.bind(this))
    );
  }

  public remindPassword(value: IRemindPasswordReq): Observable<boolean> {
    this.spinnerService.on();
    return this.post<any>('forgotten/password', value).pipe(
      map(() => true),
      catchError(() => of(false)),
      delay(1000),
      tap(() => this.spinnerService.off())
    );
  }

  public resetPassword(value: IResetPasswordReq): Observable<boolean> {
    this.spinnerService.on();
    return this.post<any>('reset/password', value).pipe(
      map(() => true),
      catchError(() => of(false)),
      delay(1000),
      tap(() => this.spinnerService.off())
    );
  }

  private afterLogin(res: any): void {
    this.storageService.set(IS_ADMIN, false);
    this.storageService.set(ACCESS_TOKEN, 'some_token');
    this.spinnerService.off();
  }

}
