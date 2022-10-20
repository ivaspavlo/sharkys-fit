import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IUserAccount } from '@app/modules/lazy/user/interfaces';
import { TrainerType } from '../../constants';


@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainersComponent {

  @Input() type: TrainerType;
  @Input() trainers: IUserAccount[] | null;

}
