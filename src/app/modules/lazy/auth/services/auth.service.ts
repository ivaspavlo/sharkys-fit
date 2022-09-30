import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { SpinnerService } from '@app/core/services';
import { ApiService } from '@app/shared/classes';
import { ISubmitTrainerReq } from '../interfaces';


@Injectable()
export class AuthService extends ApiService {

  constructor(
    protected injector: Injector,
    private spinnerService: SpinnerService
  ) {
    super(injector);
  }

  public submitTrainerData(value: ISubmitTrainerReq): Observable<boolean> {
    this.spinnerService.on();
    return of(true).pipe(
    // return this.post<ISubmitTrainerReq>('signup', value).pipe(
      delay(1000),
      map(() => true),
      catchError(() => of(false)),
      tap(() => this.spinnerService.off())
    );
  }

  public firstLogin(value: any): Observable<boolean> {
    this.spinnerService.on();
    return of(true).pipe(
    // return this.post<any>('api/accounts', value).pipe(
      delay(1000),
      map(() => true),
      catchError(() => of(false)),
      tap(() => this.spinnerService.off())
    );
  }

  public checkResetToken(value: string): Observable<boolean> {
    return of(true);
  }

}
