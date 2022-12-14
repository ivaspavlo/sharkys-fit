import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IResponseApi } from '@app/interfaces';
import { AuthService } from '@core/services';
import { basicRoutingAnimation } from '@core/animations';
import { IAsideButton } from '@app/modules/ui/aside/interfaces';
import { ToastService } from '@app/modules/ui';

import { UserService } from '../../services/user.service';
import { UserAsideButtons } from '../../constants';
import { IUserAccount } from '../../interfaces';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [basicRoutingAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  public buttons: IAsideButton[] = UserAsideButtons;
  public data$: Observable<IUserAccount | null>;

  constructor(
    private userService: UserService,
    private contexts: ChildrenOutletContexts,
    private toastService: ToastService,
    private translationService: TranslateService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initUserData();
    this.initPagesContent();
    this.data$ = this.userService.getCachedUserData();
  }

  public prepareRoute(): string {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  public onAsideBtnClick(btn: IAsideButton): void {
    if (btn.link === null) {
      this.authService.logout().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }

  public initUserData(): void {
    this.userService.getUserData().pipe(
      tap((res: IResponseApi) => {
        if (!res.valid) {
          this.toastService.show({
            text: res.error_message || this.translationService.instant('core.http-errors.general'),
            type: 'warn'
          });
        }
      })
    ).subscribe();
  }

  public initPagesContent(): void {
    this.userService.getPagesContent().pipe(
      tap((res: IResponseApi) => {
        if (!res.valid) {
          this.toastService.show({
            text: res.error_message || this.translationService.instant('core.http-errors.general'),
            type: 'warn'
          });
        }
      })
    ).subscribe();
  }

}
