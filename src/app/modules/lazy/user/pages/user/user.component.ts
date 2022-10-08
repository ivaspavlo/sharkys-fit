import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { basicRoutingAnimation } from '@app/core/animations';
import { IResponseApi } from '@app/core/interfaces';
import { IAsideButton } from '@app/modules/ui/aside/interfaces';
import { ToastService } from '@app/modules/ui/toast';
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
  public userData$: Observable<IUserAccount | {}>;

  constructor(
    private userService: UserService,
    private contexts: ChildrenOutletContexts,
    private toastService: ToastService,
    private translationService: TranslateService,
  ) { }

  ngOnInit(): void {
    // TODO: the source of user id to be clarified
    this.userData$ = this.userService.getUserData('some_id').pipe(
      map((res: IResponseApi) => {
        if (res.value) {
          return res.data;
        }
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
        return {};
      })
    );
  }

  public prepareRoute(): string {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
