import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserGalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
