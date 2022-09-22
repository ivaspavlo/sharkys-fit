import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserAsideButtons } from '../../constants';
import { IUserAsideButton } from '../../interfaces';


@Component({
  selector: 'app-user-aside',
  templateUrl: './user-aside.component.html',
  styleUrls: ['./user-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAsideComponent implements OnInit {

  public buttons: IUserAsideButton[] = UserAsideButtons;

  constructor() { }

  ngOnInit(): void {
  }

}
