import { animate, style, transition, trigger } from '@angular/animations';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Inject, ViewChild } from '@angular/core';
import { DestroySubscriptions } from '@app/shared/classes';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('100ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends DestroySubscriptions {

  @Input() hasMobileMenu = false;
  @ViewChild('headerElem') headerElem: CdkOverlayOrigin;

  public isMenuOpen = false;
  public menuHeightPx: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    super();
  }

  public onOpen(value: boolean): void {
    this.isMenuOpen = value;
    this.menuHeightPx = this.getHeightPx();
  }

  private getHeightPx(): string {
    const headerHeight = this.headerElem.elementRef.nativeElement.clientHeight;
    const documentHeight = this.document.documentElement.clientHeight;
    return `${documentHeight - headerHeight}px`;
  }

}
