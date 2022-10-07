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
      certified_trainer: true
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

  public getPayoutsData(userId: string): Observable<any[]> {
    this.spinnerService.on();
    return this.get(`payouts/${userId}`).pipe(
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
