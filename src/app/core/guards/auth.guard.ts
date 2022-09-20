import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreStorageService } from '../services';
import { CORE_ROUTE_NAMES, ACCESS_TOKEN } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private storage: CoreStorageService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate([CORE_ROUTE_NAMES.AUTH]);
    }
    return isLoggedIn;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate([CORE_ROUTE_NAMES.AUTH]);
    }
    return isLoggedIn;
  }

  private isLoggedIn(): boolean {
    return !!this.storage.get(ACCESS_TOKEN);
  }

}