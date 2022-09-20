import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { AuthService } from '../services/auth.service';


@Injectable()
export class ResetPasswordGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const resetToken = next.paramMap.get('resetToken') as string;
    return this.authService.checkResetToken(resetToken).pipe(
      tap((res: boolean) => {
        if (!res) {
          this.router.navigate([CORE_ROUTE_NAMES.NOT_FOUND]);
        }
      })
    );
  }

};
