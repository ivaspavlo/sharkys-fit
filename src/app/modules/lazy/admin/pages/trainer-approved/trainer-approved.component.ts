import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CtrlPanelButtons } from '../../constants';
import { ICtrlPanelButton } from '../../interfaces';


@Component({
  selector: 'app-trainer-approved',
  templateUrl: './trainer-approved.component.html',
  styleUrls: ['./trainer-approved.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerApprovedComponent implements OnInit {

  public buttons: ICtrlPanelButton[] = CtrlPanelButtons;
  public current: ICtrlPanelButton = this.buttons[0];

  constructor() { }

  ngOnInit(): void {
  }

  public onCancelTrainer(): void { }

}
