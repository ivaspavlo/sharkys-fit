import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IAsideButton } from '../../interfaces';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {

  @Input() buttons: IAsideButton[];
  @Output() asideBtnClick: EventEmitter<IAsideButton> = new EventEmitter();

}
