import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { CoreStorageService, SpinnerService } from '@app/core/services';
import { IResponseApi } from '@app/core/interfaces';
import { USER_ID } from '@app/core/constants';
import { ApiService } from '@app/shared/classes';
import { IPaymentData, ISetpuPayoutsSuccessRes, ISetupPayoutsReq, IUploadFileSuccessRes, IUserAccount } from '../interfaces';
import { HttpErrorResponse } from '@angular/common/http';


const mockUserData = of({
  first_name: 'John',
  last_name: 'Smith',
  email: 'john.smith@gmail.com',
  address: 'Sometown 1010, Somestreet 12',
  phone_number: '+1 555 777 000',
  training_location: 'Pasadena',
  market_of_interest: 'Pasadena',
  number_of_clients: 1000,
  favorite_location: 'Pasadena',
  specialization: 'Karate dancing',
  bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt minus quod temporibus consequatur totam tenetur magni asperiores aperiam enim doloremque natus vel, error reprehenderit similique. Consectetur accusamus repudiandae vitae blanditiis.',
  certified_trainer: true,
  image_url: '/assets/img/png/mock-avatar.png',
  payout_amount: '100.00'
});

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

  private getUserId(): string {
    return this.storageService.get(USER_ID);
  }

  public getUserData(): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.get<any>(`accounts/${this.getUserId()}`).pipe(
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
    this.spinnerService.on();
    return this.post<any>('upload', req).pipe(
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

  public getPayoutsData(): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.get<any>(`payouts/${this.getUserId()}`).pipe(
      map((res: IPaymentData[]) => {
        return {
          valid: true,
          data: res
        }
      }),
      catchError(() => of({
        valid: false,
        data: []
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public setupPayouts(): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.post<any>('payouts', { id: this.getUserId() }).pipe(
      map((res: ISetpuPayoutsSuccessRes) => {
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
