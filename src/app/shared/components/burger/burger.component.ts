import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, Input, Output } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BurgerComponent implements OnInit {

  @Input() init: boolean;
  @Input() closeOnOuterClick = true;
  @Output() isOn: EventEmitter<boolean> = new EventEmitter();

  public _isOn: boolean;
  private componentDestroyed$: Subject<void> = new Subject();

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this._isOn = this.init || false;
  }

  public onBtnClick(event: MouseEvent): void {
    this.switchStateAndEmit(event);
    if (this._isOn && this.closeOnOuterClick) {
      this.listenToOuterClick();
    }
  }

  private listenToOuterClick(): void {
    fromEvent(this.document, 'click').pipe(
      first(),
      takeUntil(this.componentDestroyed$)
    ).subscribe((event: any) => {
      if (this._isOn) {
        this.switchStateAndEmit(event);
      }
    });
  }

  private switchStateAndEmit(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this._isOn = !this._isOn;
    this.isOn.emit(this._isOn);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
