import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { IAsideButton } from '@app/modules/ui/aside/interfaces';
import { routingAnimations } from '@app/core/animations';
import { UserService } from '../../services/user.service';
import { UserAsideButtons } from '../../constants';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [routingAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  public buttons: IAsideButton[] = UserAsideButtons;
  public userData$: Observable<any>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userData$ = this.userService.getUserData();
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }

}
