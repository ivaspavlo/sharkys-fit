import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { SpinnerService } from '@app/core/services';
import { IResponseApi } from '@app/core/interfaces';
import { ApiService } from '@app/shared/classes';
import { ITrainer } from '../interfaces';


const mockTrainer: ITrainer = {
  name: 'John Smith',
  location: 'Pasadena',
  payouts: [1,2,3,4],
  bio: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit eaque, fuga qui dolor quam, iusto itaque ut incidunt nesciunt at nostrum quo. Ullam dolores quae architecto dicta facere quibusdam modi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit quis cumque eaque suscipit voluptates amet assumenda similique molestias beatae, corrupti non quibusdam sequi asperiores ducimus accusantium laborum! Velit, quo quos.`
};

@Injectable()
export class AdminService extends ApiService {

  constructor(
    protected injector: Injector,
    private spinnerService: SpinnerService
  ) {
    super(injector);
  }

  public getTrainers(type: 'approved' | 'pending'): Observable<IResponseApi> {
    this.spinnerService.on();
    // TODO: response format is unknown
    return this.get<any>(`admin/trainers?status=${type}`).pipe(
      map((res: any) => {
        return {
          value: true,
          data: [{},{},{}]
        }
      }),
      catchError((res: any) => of({
        value: false,
        error_message: res.error_message
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public getSingleTrainer(trainerId: string): Observable<IResponseApi> {
    this.spinnerService.on();
    // TODO: response format is unknown
    return this.get(`admin/trainers/${trainerId}`).pipe(
      map((res: any) => {
        return {
          value: true,
          data: mockTrainer
        };
      }),
      catchError((res: any) => of({
        value: false,
        error_message: res.error_message
      })),
      tap(() => this.spinnerService.off())
    );
  }

  public cancelTrainer(id: string = '1'): Observable<boolean> {
    this.spinnerService.on();
    return this.delete('admin/trainers', { id }).pipe(
      map(() => true),
      catchError(() => of(false)),
      delay(1000),
      tap(() => this.spinnerService.off())
    );
  }

  public approveTrainer(id: string = '1'): Observable<boolean> {
    this.spinnerService.on();
    return this.post('admin/trainers', { status: 'approved', id }).pipe(
      map(() => true),
      catchError(() => of(false)),
      delay(1000),
      tap(() => this.spinnerService.off())
    );
  }

}
