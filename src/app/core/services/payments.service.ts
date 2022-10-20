import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IPaymentData, IResponseApi, ISetpuPayoutsSuccessRes } from '@app/interfaces';
import { ApiService } from '@app/shared/classes';
import { SpinnerService } from './spinner.service';
import { CoreStorageService } from './core-storage.service';
import { USER_ID } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends ApiService {

  constructor(
    protected injector: Injector,
    private spinnerService: SpinnerService,
    private storageService: CoreStorageService
  ) {
    super(injector);
  }

  public getPayoutsData(): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.get<any>(`payouts/${this.storageService.get(USER_ID)}`).pipe(
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
    return this.post<any>('payouts', { id: this.storageService.get(USER_ID) }).pipe(
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
