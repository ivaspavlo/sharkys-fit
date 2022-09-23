import { Injectable, Injector } from '@angular/core';
import { ApiService } from '@app/shared/classes';
import { Observable, of } from 'rxjs';


@Injectable()
export class UserService extends ApiService {

  constructor(
    protected injector: Injector
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

  public updateAccount(req: any): Observable<boolean> {
    return of(true);
  }

}
