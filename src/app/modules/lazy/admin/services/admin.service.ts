import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SpinnerService } from '@core/services';
import { IResponseApi } from '@app/interfaces';
import { ApiService } from '@app/shared/classes';
import { TrainerType } from '../constants';
import { IUserAccount } from '../../user/interfaces';


@Injectable()
export class AdminService extends ApiService {

  constructor(
    protected injector: Injector,
    private spinnerService: SpinnerService
  ) {
    super(injector);
  }

  public getTrainers(type: TrainerType): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.get<any>(`admin/trainers?status=${type}`).pipe(
      map((res: IUserAccount) => {
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

  public getSingleTrainer(trainerId: string): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.get<any>(`admin/trainers/${trainerId}`).pipe(
      map((res: IUserAccount) => {
        return {
          valid: true,
          data: res
        };
      }),
      catchError((res: any) => of({
        valid: false,
        error_message: res.error_message
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public cancelTrainer(id: string): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.delete<any>('admin/trainers', { body: { id }}).pipe(
      map((res: any) => ({
        valid: true
      })),
      catchError((res: any) => of({
        error_message: res.error_message,
        valid: false
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public approveTrainer(id: string = '1'): Observable<IResponseApi> {
    this.spinnerService.on();
    return this.post('admin/trainers', { status: 'approved', id }).pipe(
      map((res: any) => ({
        valid: true
      })),
      catchError((res: any) => of({
        error_message: res.error_message,
        valid: false
      })),
      tap(() => this.spinnerService.off())
    );
  }

}
