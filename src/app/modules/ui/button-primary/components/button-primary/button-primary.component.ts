import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonPrimaryComponent {

  @Input() title = '';
  @Input() filled = false;
  @Input() routerLink: string | null = null;
  @Input() noBorder = false;
  @Input() disabled = false;
  @Input() size = '';

  @Output() buttonPrimaryClick: EventEmitter<void> = new EventEmitter();

  public onClick(): void {
    this.buttonPrimaryClick.emit();
  }

}
