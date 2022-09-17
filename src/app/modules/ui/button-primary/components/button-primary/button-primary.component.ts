import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonPrimaryComponent {

  @Input() title = 'button';
  @Input() filled = false;
  @Input() routerLink = null;
  @Input() fullWidth = false;
  @Input() link = false;
  @Input() disabled = false;

  @Output() buttonPrimaryClick: EventEmitter<void> = new EventEmitter();

  public onClick(): void {
    this.buttonPrimaryClick.emit();
  }

}
