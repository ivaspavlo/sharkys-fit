import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { basicRoutingAnimation } from '@app/core/animations';
import { IAsideButton } from '@app/modules/ui/aside/interfaces';
import { AsideButtons } from '../../constants';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [basicRoutingAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  public buttons: IAsideButton[] = AsideButtons;

  constructor(
    private contexts: ChildrenOutletContexts
  ) { }

  ngOnInit(): void {
  }

  public prepareRoute(): string {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
