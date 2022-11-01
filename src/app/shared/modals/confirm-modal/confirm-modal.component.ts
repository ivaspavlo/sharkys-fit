import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogConfig, DialogRef } from '@app/modules/ui';


@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent {

  constructor(
    public dialog: DialogRef,
    public config: DialogConfig
  ) { }

}
