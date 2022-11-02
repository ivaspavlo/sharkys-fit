import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular';

import { COMPONENTS } from '../input/components';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    LightgalleryModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class GalleryModule { }
