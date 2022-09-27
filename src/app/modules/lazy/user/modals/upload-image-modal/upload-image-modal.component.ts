import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-modal.component.html',
  styleUrls: ['./upload-image-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadImageModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
