import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { basicRoutingAnimation } from '@app/core/animations';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [basicRoutingAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {

  constructor(
    private contexts: ChildrenOutletContexts
  ) { }

  public prepareRoute() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
