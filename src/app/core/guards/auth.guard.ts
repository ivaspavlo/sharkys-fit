import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';
import { CORE_ROUTE_NAMES } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authSerive: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.authSerive.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate([CORE_ROUTE_NAMES.AUTH]);
    }
    return isLoggedIn;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.authSerive.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate([CORE_ROUTE_NAMES.AUTH]);
    }
    return isLoggedIn;
  }

}