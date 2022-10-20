import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IFirstLoginReq, ILoginReq, ILoginSuccessRes, IRemindPasswordReq, IRemindPasswordRes, IResetPasswordReq, IResponseApi, ISubmitTrainerReq } from '@app/interfaces';
import { CoreStorageService, SpinnerService } from '@core/services';
import { ACCESS_TOKEN, IS_ADMIN, USER_ID } from '@core/constants';
import { ApiService } from '@app/shared/classes';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  constructor(
    protected injector: Injector,
    private spinnerService: SpinnerService,
    private storageService: CoreStorageService
  ) {
    super(injector);
  }

  public submitTrainerData(value: ISubmitTrainerReq): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.post<IResponseApi>('signup', value).pipe(
      map(() => {
        return {
          valid: true
        }
      }),
      catchError((res: HttpErrorResponse) => {
        return of({ valid: false, error_message: res.error.error_message || '' });
      }),
      tap(() => this.spinnerService.off())
    );
  }

  public firstLogin(value: IFirstLoginReq): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.post<any>('accounts', value).pipe(
      map((res: ILoginSuccessRes) => ({
        valid: true,
        data: res
      })),
      catchError((res: HttpErrorResponse) => of({
        valid: false,
        error_message: res.error.error_message
      })),
      tap(this.afterLogin.bind(this))
    );
  }

  public login(value: ILoginReq): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.post<any>('login', value).pipe(
      map((res: ILoginSuccessRes) => ({
        valid: true,
        data: res
      })),
      catchError((res: HttpErrorResponse) => of({
        valid: false,
        error_message: res.error.error_message
      })),
      tap(this.afterLogin.bind(this))
    );
  }

  public remindPassword(value: IRemindPasswordReq): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.post<any>('forgotten/password', value).pipe(
      map((res: IRemindPasswordRes) => ({
        valid: true,
        data: res
      })),
      catchError((res: HttpErrorResponse) => of({
        valid: false,
        error_message: res.error.error_message
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public resetPassword(value: IResetPasswordReq): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.post<any>('reset/password', value).pipe(
      map(() => ({
        valid: true
      })),
      catchError((res: HttpErrorResponse) => of({
        valid: false,
        error_message: res.error.error_message
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public logout(): Observable<boolean> {
    this.storageService.remove(USER_ID);
    this.storageService.remove(IS_ADMIN);
    this.storageService.remove(ACCESS_TOKEN);
    return of(true);
  }

  private afterLogin(res: IResponseApi): void {
    if (res.valid) {
      this.storageService.set(USER_ID, res.data.user_id);
      this.storageService.set(IS_ADMIN, res.data.role === 'admin');
      this.storageService.set(ACCESS_TOKEN, res.data.token);
    }
    this.spinnerService.off();
  }

}
