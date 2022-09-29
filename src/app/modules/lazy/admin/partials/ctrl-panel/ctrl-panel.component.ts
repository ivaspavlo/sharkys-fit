import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ICtrlPanelButton } from '../../interfaces';


@Component({
  selector: 'app-ctrl-panel',
  templateUrl: './ctrl-panel.component.html',
  styleUrls: ['./ctrl-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtrlPanelComponent implements OnInit {

  @Input() buttons: ICtrlPanelButton[] = [];
  @Output() ctrlClick: EventEmitter<ICtrlPanelButton> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
