import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ISaveCroppedImageEvent } from '@app/interfaces';
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

  public onSaveImage(imgSaveEvent: ISaveCroppedImageEvent): void {
    this.dialog.close(imgSaveEvent);
  }

}
