import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { SpinnerService } from '@app/core/services';
import { ApiService } from '@app/shared/classes';


@Injectable()
export class AdminService extends ApiService {

  constructor(
    protected injector: Injector,
    private spinnerService: SpinnerService
  ) {
    super(injector);
  }

  public getTrainers(approved: boolean): Observable<any[]> {
    this.spinnerService.on();
    return this.get(`trainers?${approved ? 'approved' : 'pending'}`).pipe(
      map(() => [0,1,2,3]),
      catchError(() => of([0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3])),
      delay(1000),
      tap(() => this.spinnerService.off())
    );
  }

}
