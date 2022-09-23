import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  public userData$: Observable<any>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userData$ = this.userService.getUserData();
  }

}
