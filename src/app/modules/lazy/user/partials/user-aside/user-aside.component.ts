import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { UserAsideButtons } from '../../constants';
import { IUserAsideButton } from '../../interfaces';


@Component({
  selector: 'app-user-aside',
  templateUrl: './user-aside.component.html',
  styleUrls: ['./user-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAsideComponent {

  @Input() userData: any;

  public buttons: IUserAsideButton[] = UserAsideButtons;

  constructor() { }

}