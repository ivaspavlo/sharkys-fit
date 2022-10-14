import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TrainerType } from '../../constants';
import { ITrainer } from '../../interfaces';


@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainersComponent {

  @Input() type: TrainerType;
  @Input() trainers: ITrainer[] | null;

}
