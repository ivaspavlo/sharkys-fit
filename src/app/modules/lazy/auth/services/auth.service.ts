import { Injectable, Injector } from '@angular/core';
import { ApiService } from '@app/shared/classes';
import { Observable, of } from 'rxjs';


@Injectable()
export class AuthService extends ApiService {

  constructor(
    protected injector: Injector
  ) {
    super(injector);
  }

  public submitTrainerData(value: any): Observable<any> {
    return of(true);
  }

  public firstLogin(value: any): Observable<any> {
    return of(true);
  }

  public checkResetToken(value: string): Observable<boolean> {
    return of(true);
  }

}
