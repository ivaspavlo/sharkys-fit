import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTE_NAMES } from '../../constants';
import { IUserContent } from '../../interfaces';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-earnings-info',
  templateUrl: './earnings-info.component.html',
  styleUrls: ['./earnings-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EarningsInfoComponent implements OnInit {

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
      map((res: IUserContent | null) => res ? res[ROUTE_NAMES.EARNINGS_INFO] : null)
    );
  }

}
