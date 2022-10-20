import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DialogRef } from '@app/modules/ui/dialog';
import { DIALOG_SIZES } from '@core/constants';


@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogContentComponent {

  @Input() set size(value: string) {
    this._size = DIALOG_SIZES[value] || DIALOG_SIZES.auto;
  }
  get size() {
    return this._size;
  }
  private _size: string = DIALOG_SIZES.auto;

  constructor(
    public dialog: DialogRef
  ) { }

}
