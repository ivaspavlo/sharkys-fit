import { Injectable, Injector } from "@angular/core";
import { ApiService } from "@app/shared/classes";


@Injectable()
export class UserService extends ApiService {

  constructor(
    protected injector: Injector
  ) {
    super(injector);
  }

}
