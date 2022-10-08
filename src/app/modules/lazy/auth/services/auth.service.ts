import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CoreStorageService, SpinnerService } from '@app/core/services';
import { ACCESS_TOKEN, IS_ADMIN } from '@app/core/constants';
import { IResponseApi } from '@app/core/interfaces';
import { ApiService } from '@app/shared/classes';
import { IFirstLoginReq, ILoginFailureRes, ILoginReq, ILoginSuccessRes, IRemindPasswordReq, IRemindPasswordRes, IResetPasswordFailureRes, IResetPasswordReq, ISubmitTrainerReq } from '../interfaces';


const mockLoginData = {
  token: 'some_token',
  role: 'admin'
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
      catchError((res: IResponseApi) => of({ value: false, error_message: res.error_message || '' })),
      tap(() => this.spinnerService.off())
    );
  }

  public firstLogin(value: IFirstLoginReq): Observable<IResponseApi> {
    // TODO: response format is unknown
    this.spinnerService.on();
    return of(mockLoginData as ILoginSuccessRes).pipe(
    // return this.post<any>('accounts', value).pipe(
      map((res: ILoginSuccessRes) => ({
        value: true,
        data: res
      })),
      catchError((res: ILoginFailureRes) => of({ value: false, error_message: res.error_message })),
      tap(this.afterLogin.bind(this))
    );
  }

  public login(value: ILoginReq): Observable<IResponseApi> {
    this.spinnerService.on();
    return of(mockLoginData as ILoginSuccessRes).pipe(
    // return this.post<any>('login', value).pipe(
      map((res: ILoginSuccessRes) => ({
        value: true,
        data: res
      })),
      catchError((res: ILoginFailureRes) => of({ value: false, error_message: res.error_message })),
      tap(this.afterLogin.bind(this))
    );
  }

  public remindPassword(value: IRemindPasswordReq): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.post<any>('forgotten/password', value).pipe(
      map((res: IRemindPasswordRes) => ({ value: true, data: res })),
      catchError((res: any) => of({
        value: false
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public resetPassword(value: IResetPasswordReq): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.post<any>('reset/password', value).pipe(
      map(() => ({
        value: true
      })),
      catchError((res: IResetPasswordFailureRes) => of({
        value: false,
        error_message: res.error_message
      })),
      tap(() => this.spinnerService.off())
    );
  }

  private afterLogin(res: IResponseApi): void {
    if (res.value) {
      this.storageService.set(IS_ADMIN, res.data.role === 'admin');
      this.storageService.set(ACCESS_TOKEN, res.data.token);
    }
    this.spinnerService.off();
  }

}
