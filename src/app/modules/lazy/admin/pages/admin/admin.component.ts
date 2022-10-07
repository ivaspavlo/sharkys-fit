import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { IAsideButton } from '@app/modules/ui/aside/interfaces';
import { AsideButtons } from '../../constants';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  public buttons: IAsideButton[] = AsideButtons;

  constructor(
    private contexts: ChildrenOutletContexts
  ) { }

  ngOnInit(): void {
  }

  public prepareRoute() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
