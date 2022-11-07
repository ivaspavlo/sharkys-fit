import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserContent } from '../../interfaces';
import { ROUTE_NAMES } from '../../constants';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GettingStartedComponent implements OnInit {

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
      map((res: IUserContent | null) => res ? res[ROUTE_NAMES.GETTING_STARTED] : null)
    );
  }

}
