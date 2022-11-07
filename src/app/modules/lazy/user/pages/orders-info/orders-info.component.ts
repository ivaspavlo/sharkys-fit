import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTE_NAMES } from '../../constants';
import { IUserContent } from '../../interfaces';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-orders-info',
  templateUrl: './orders-info.component.html',
  styleUrls: ['./orders-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersInfoComponent implements OnInit {

  public content$: Observable<string | null>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // TODO: add fallback content.
    this.initContent();
  }

  private initContent(): void {
    this.content$ = this.userService.getCahcedPagesContent().pipe(
      map((res: IUserContent | null) => res ? res[ROUTE_NAMES.ORDERS_INFO] : null)
    );
  }

}
