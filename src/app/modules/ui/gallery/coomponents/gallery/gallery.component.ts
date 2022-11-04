import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BeforeSlideDetail } from 'lightgallery/lg-events';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {

  settings = {
    counter: false,
    // plugins: [lgZoom],
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  ngOnInit() {
    
  }

}
