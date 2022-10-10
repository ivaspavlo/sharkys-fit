import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { authRoutingAnimation } from '@app/core/animations';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [authRoutingAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {

  constructor(
    private contexts: ChildrenOutletContexts
  ) { }

  public prepareRoute(): string {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
