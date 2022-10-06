import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CORE_ROUTE_NAMES, IS_ADMIN } from '../constants';
import { CoreStorageService } from '../services';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(
    private router: Router,
    private storage: CoreStorageService
  ) { }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const isAdmin = this.isAdmin();
    if (!isAdmin) {
      this.router.navigate([CORE_ROUTE_NAMES.USER]);
    }
    return isAdmin;
  }

  private isAdmin(): boolean {
    return JSON.parse(this.storage.get(IS_ADMIN));
  }

}
