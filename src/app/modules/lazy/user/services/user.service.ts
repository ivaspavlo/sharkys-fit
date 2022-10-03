import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { SpinnerService } from '@app/core/services';
import { ApiService } from '@app/shared/classes';
import { ISetupPayoutsReq, IUserAccount } from '../interfaces';


@Injectable()
export class UserService extends ApiService {

  constructor(
    protected injector: Injector,
    private spinnerService: SpinnerService,
  ) {
    super(injector);
  }

  public getUserData(): Observable<any> {
    return of({
      name: 'John Smith',
      payoutAmount: '100.00',
      avatar: '/assets/img/png/mock-avatar.png'
    });
  }

  public getAccountData(): Observable<any> {
    return of({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@gmail.com',
      address: 'Sometown 1010, Somestreet 12',
      phoneNumber: '+1 555 777 000',
      instagram: '@johnsmith',
      quote: 'Chuck Norris stands faster than anyone can run.',
      location: 'Some location',
      sports: 'Karate dancing',
      certification: 'Some certification',
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt minus quod temporibus consequatur totam tenetur magni asperiores aperiam enim doloremque natus vel, error reprehenderit similique. Consectetur accusamus repudiandae vitae blanditiis.'
    });
  }

  public updateAccount(req: IUserAccount): Observable<boolean> {
    this.spinnerService.on();
    return this.put('accounts', req).pipe(
      map(() => true),
      catchError(() => of(false)),
      delay(1000),
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

  public getPayoutsData(): Observable<any[]> {
    this.spinnerService.on();
    return this.get('payouts').pipe(
      map(() => [0,1]),
      catchError(() => of([])),
      delay(1000),
      tap(() => this.spinnerService.off())
    );
  }

  public fileUpload(req: FormData): Observable<boolean> {
    this.spinnerService.on();
    return this.post('upload', req).pipe(
      map(() => true),
      catchError(() => of(false)),
      delay(1000),
      tap(() => this.spinnerService.off())
    );
  }

}
