import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadAvatarComponent {

  @Output() saveAvatar: EventEmitter<FormData> = new EventEmitter();

  public showPreview = false;
  public formData: FormData;
  public imgSrc: SafeUrl | null;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  public onChange(event: any): void {
    if (event.target.files.length > 0) {
      this.showPreview = true;
      const blob = event.target.files[0];

      this.formData = new FormData();
      this.formData.append('fileToUpload', blob);

      const url = URL.createObjectURL(blob);
      this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }

  public onSave(): void {
    this.showPreview = false;
    this.saveAvatar.emit(this.formData);
  }

}
