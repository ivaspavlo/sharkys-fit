import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { basicRoutingAnimation } from '@core/animations';
import { AuthService } from '@core/services';
import { IAsideButton } from '@app/modules/ui/aside/interfaces';
import { AsideButtons } from '../../constants';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [basicRoutingAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {

  public buttons: IAsideButton[] = AsideButtons;

  constructor(
    private contexts: ChildrenOutletContexts,
    private authService: AuthService,
    private router: Router
  ) { }

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

}
