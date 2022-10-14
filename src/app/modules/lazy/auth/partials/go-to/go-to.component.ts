import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-go-to',
  templateUrl: './go-to.component.html',
  styleUrls: ['./go-to.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoToComponent {

  @Input() text: string;
  @Input() linkUrl: string;
  @Input() linkText: string;
  @Output() linkClick: EventEmitter<string> = new EventEmitter();

}
