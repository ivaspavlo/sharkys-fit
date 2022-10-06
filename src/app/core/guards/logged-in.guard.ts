import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, CORE_ROUTE_NAMES } from '../constants';
import { CoreStorageService } from '../services';


@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanLoad {

  constructor(
    private router: Router,
    private storage: CoreStorageService
  ) { }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate([CORE_ROUTE_NAMES.ADMIN]);
    }
    return isLoggedIn;
  }

  private isLoggedIn(): boolean {
    return !!this.storage.get(ACCESS_TOKEN);
  }

}