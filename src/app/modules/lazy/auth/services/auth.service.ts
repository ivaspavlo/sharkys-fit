import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CoreStorageService, SpinnerService } from '@app/core/services';
import { ACCESS_TOKEN, IS_ADMIN, USER_ID } from '@app/core/constants';
import { IResponseApi } from '@app/core/interfaces';
import { ApiService } from '@app/shared/classes';
import { IFirstLoginReq, ILoginReq, ILoginSuccessRes, IRemindPasswordReq, IRemindPasswordRes, IResetPasswordReq, ISubmitTrainerReq } from '../interfaces';
import { HttpErrorResponse } from '@angular/common/http';


const mockLoginData = {
  token: 'some_token',
  role: 'user'
}

@Injectable()
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
      catchError((res: IResponseApi) => of({ valid: false, error_message: res.error_message || '' })),
      tap(() => this.spinnerService.off())
    );
  }

  public firstLogin(value: IFirstLoginReq): Observable<IResponseApi> {
    // TODO: needs to be tested
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
    // TODO: needs to be tested
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

  private afterLogin(res: IResponseApi): void {
    if (res.valid) {
      this.storageService.set(USER_ID, res.data.user_id);
      this.storageService.set(IS_ADMIN, res.data.role === 'admin');
      this.storageService.set(ACCESS_TOKEN, res.data.token);
    }
    this.spinnerService.off();
  }

}
