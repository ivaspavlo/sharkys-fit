import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IResponseApi } from '@app/interfaces';
import { AuthService } from '@core/services';
import { basicRoutingAnimation } from '@core/animations';
import { IAsideButton } from '@app/modules/ui/aside/interfaces';
import { ToastService } from '@app/modules/ui';

import { UserService } from '../../services/user.service';
import { UserAsideButtons } from '../../constants';
import { IUserAccount, IUserContent } from '../../interfaces';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [basicRoutingAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  public buttons: IAsideButton[] = UserAsideButtons;
  public data$: Observable<IUserAccount | {}>;

  constructor(
    private userService: UserService,
    private contexts: ChildrenOutletContexts,
    private toastService: ToastService,
    private translationService: TranslateService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const accountData$ = this.getUserData();
    const pagesContent$ = this.getPagesContent();
    this.data$ = forkJoin([accountData$, pagesContent$]).pipe(
      map(([accountData,]) => accountData || {}),
      shareReplay()
    );
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

  public getUserData(): Observable<IUserAccount | null> {
    return this.userService.getUserData().pipe(
      map((res: IResponseApi) => {
        if (res.valid) {
          return res.data;
        }
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
        return null;
      })
    );
  }

  public getPagesContent(): Observable<IUserContent | null> {
    return this.userService.getPagesContent().pipe(
      map((res: IResponseApi) => {
        return res.data || null;
      })
    );
  }

}
