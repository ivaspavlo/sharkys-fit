import { Component, ChangeDetectionStrategy, Input } from '@angular/core';


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

}
