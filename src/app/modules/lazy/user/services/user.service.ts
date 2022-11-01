import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CoreStorageService, SpinnerService } from '@core/services';
import { USER_ID } from '@core/constants';
import { IResponseApi } from '@app/interfaces';
import { ApiService } from '@app/shared/classes';
import { IContact, IUploadFileSuccessRes, IUserAccount, IUserContent } from '../interfaces';


@Injectable()
export class UserService extends ApiService {

  private _cachedUserData$ = new BehaviorSubject<IUserAccount | null>(null);
  private _cachedPagesContent$ = new BehaviorSubject<IUserContent | null>(null);

  constructor(
    protected injector: Injector,
    private spinnerService: SpinnerService,
    private storageService: CoreStorageService
  ) {
    super(injector);
  }

  private cacheUserData(data: IUserAccount): void {
    this._cachedUserData$.next(data);
  }

  public getCachedUserData(): Observable<IUserAccount | null> {
    return this._cachedUserData$.asObservable();
  }

  public getUserData(): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.get<IUserAccount>(`accounts/${this.storageService.get(USER_ID)}`).pipe(
      tap((res: IUserAccount) => {
        this.cacheUserData(res);
      }),
      map((res: IUserAccount) => ({
        valid: true,
        data: res
      })),
      catchError((res: HttpErrorResponse) => of({
        valid: false,
        error_message: res.error.error_message || ''
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public fileUpload(req: FormData): Observable<IResponseApi> {
    // TODO: clarify request format and remove IUploadFileReq if needed
    this.spinnerService.on();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.post<IUploadFileSuccessRes>('upload', req, { headers }).pipe(
      map((res: IUploadFileSuccessRes) => ({
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

  public updateAccount(req: IUserAccount): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.put<IUserAccount>('accounts', req).pipe(
      map((res: IUserAccount) => {
        this.cacheUserData(res);
        return {
          valid: true,
          data: res
        }
      }),
      catchError((res: HttpErrorResponse) => of({
        valid: false,
        error_message: res.error.error_message
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public contact(req: IContact): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.post<any>('contact', req).pipe(
      map(() => {
        return {
          valid: true
        };
      }),
      catchError((res: HttpErrorResponse) => of({
        valid: false,
        error_message: res.error.error_message
      })),
      tap(() => this.spinnerService.off())
    );
  }

  private cachePagesContent(res: IUserContent): void {
    this._cachedPagesContent$.next(res);
  }

  public getCahcedPagesContent(): Observable<IUserContent | null> {
    return this._cachedPagesContent$.asObservable();
  }

  public getPagesContent(): Observable<IResponseApi> {
    this.spinnerService.on();
    // TODO: agree the request with Ben
    // return this.get<IUserContent>('user/content').pipe(
    return of({
      account: "A Sharky's Reward Account is required to join Sharky's Fit. We will create an account automatically for you and include the account username and password in the confirmation email. If you have a Sharky's Reward Account and have registered it, please make sure to use an different email address when creating your Sharky's Fit Account.",
      payments: "A Sharky's Reward Account is required to join Sharky's Fit. We will create an account automatically for you and include the account username and password in the confirmation email. If you have a Sharky's Reward Account and have registered it, please make sure to use an different email address when creating your Sharky's Fit Account.",
      starting: "A Sharky's Reward Account is required to join Sharky's Fit. We will create an account automatically for you and include the account username and password in the confirmation email. If you have a Sharky's Reward Account and have registered it, please make sure to use an different email address when creating your Sharky's Fit Account.",
      earnings: "A Sharky's Reward Account is required to join Sharky's Fit. We will create an account automatically for you and include the account username and password in the confirmation email. If you have a Sharky's Reward Account and have registered it, please make sure to use an different email address when creating your Sharky's Fit Account.",
      orders: "A Sharky's Reward Account is required to join Sharky's Fit. We will create an account automatically for you and include the account username and password in the confirmation email. If you have a Sharky's Reward Account and have registered it, please make sure to use an different email address when creating your Sharky's Fit Account.",
      promotions: "A Sharky's Reward Account is required to join Sharky's Fit. We will create an account automatically for you and include the account username and password in the confirmation email. If you have a Sharky's Reward Account and have registered it, please make sure to use an different email address when creating your Sharky's Fit Account."
    }).pipe(
      tap((res: IUserContent) => {
        this.cachePagesContent(res);
      }),
      map((res: IUserContent) => {
        return {
          valid: true,
          data: res
        };
      }),
      catchError((res: HttpErrorResponse) => of({
        valid: false,
        error_message: res.error.error_message
      })),
      tap(() => this.spinnerService.off())
    );
  }

}
