import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { SpinnerService } from '@app/core/services';
import { IResponseApi } from '@app/core/interfaces';
import { ApiService } from '@app/shared/classes';
import { ISetupPayoutsReq, IUploadFileSuccessRes, IUserAccount } from '../interfaces';


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
  ) {
    super(injector);
  }

  public getUserData(userId: string): Observable<IResponseApi> {
    this.spinnerService.on();
    // TODO: response format is not known
    return this.get<any>(`accounts/${userId}`).pipe(
      map((res: IUserAccount) => {
        this.cacheUserData(res);
        return {
          valid: true,
          data: res
        };
      }),
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

  public setupPayouts(req: ISetupPayoutsReq): Observable<boolean> {
    this.spinnerService.on();
    return this.post('payouts', req).pipe(
      map(() => true),
      catchError(() => of(false)),
      delay(1000),
      tap(() => this.spinnerService.off())
    );
  }

  public getPayoutsData(userId: string): Observable<any[]> {
    this.spinnerService.on();
    return this.get(`payouts/${userId}`).pipe(
      map(() => [0,1]),
      catchError(() => of([])),
      delay(1000),
      tap(() => this.spinnerService.off())
    );
  }

}
