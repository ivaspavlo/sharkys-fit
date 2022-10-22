import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CoreStorageService, SpinnerService } from '@core/services';
import { USER_ID } from '@core/constants';
import { IResponseApi } from '@app/interfaces';
import { ApiService } from '@app/shared/classes';
import { IUploadFileSuccessRes, IUserAccount } from '../interfaces';


@Injectable()
export class UserService extends ApiService {

  private _cachedUserData$ = new BehaviorSubject<IUserAccount | null>(null);

  constructor(
    protected injector: Injector,
    private spinnerService: SpinnerService,
    private storageService: CoreStorageService
  ) {
    super(injector);
  }

  public getUserData(): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.get<any>(`accounts/${this.storageService.get(USER_ID)}`).pipe(
      tap((res: IUserAccount) => {
        this.cacheUserData(res);
      }),
      map((res: IUserAccount) => ({
        valid: true,
        data: res
      })),
      catchError((res: any) => of({
        valid: false,
        error_message: res.error_message || ''
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public getCachedUserData(): Observable<IUserAccount | null> {
    return this._cachedUserData$.asObservable();
  }

  private cacheUserData(data: IUserAccount): void {
    this._cachedUserData$.next(data);
  }

  public fileUpload(req: FormData): Observable<IResponseApi> {
    // TODO: clarify request format and remove IUploadFileReq if needed
    this.spinnerService.on();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.post<any>('upload', req, { headers }).pipe(
      map((res: IUploadFileSuccessRes) => ({
        valid: true,
        data: res
      })),
      catchError((res: any) => of({
        valid: false,
        error_message: res.error_message
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public updateAccount(req: IUserAccount): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.put<any>('accounts', req).pipe(
      map((res: IUserAccount) => {
        this.cacheUserData(res);
        return {
          valid: true,
          data: res
        }
      }),
      catchError((res: any) => of({
        valid: false,
        error_message: res.error_message
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public contact(req: any): Observable<IResponseApi> {
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

}
