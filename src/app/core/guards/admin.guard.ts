import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CORE_ROUTE_NAMES } from '../constants';
import { AuthService } from '../services';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(
    private router: Router,
    private authSerive: AuthService
  ) { }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const isAdmin = this.authSerive.isAdmin();
    if (!isAdmin) {
      this.router.navigate([CORE_ROUTE_NAMES.USER]);
    }
    return isAdmin;
  }

}
