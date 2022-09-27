import { Component, ChangeDetectionStrategy, ViewChild, Output, EventEmitter } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CropperComponent {

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  @Output() saveCroppedImage: EventEmitter<string | null | undefined> = new EventEmitter();

  public imageChangedEvent: any = '';
  public croppedImage: string | null | undefined = '';

  public onChange(event: unknown): void {
    this.imageChangedEvent = event;
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  public crop(): void {
    this.imageCropper.crop();
  }

  public onSave(): void {
    this.saveCroppedImage.emit(this.croppedImage);
  }
}
