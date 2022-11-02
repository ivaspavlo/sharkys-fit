import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular/13';

import { COMPONENTS } from './coomponents';


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
