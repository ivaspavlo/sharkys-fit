import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IAsideButton } from '@app/modules/ui/aside/interfaces';
import { UserService } from '../../services/user.service';
import { UserAsideButtons } from '../../constants';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
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

}
