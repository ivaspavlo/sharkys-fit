import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogRef } from '@app/modules/ui';


@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-modal.component.html',
  styleUrls: ['./upload-image-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadImageModalComponent {

  constructor(
    private dialog: DialogRef
  ) { }

  public onSaveImage(imgBase64: string | null | undefined): void {
    if (typeof imgBase64 === 'string') {
      this.dialog.close({ imgBase64 });
    }
  }

}
