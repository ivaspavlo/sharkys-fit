import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-trainer-pending',
  templateUrl: './trainer-pending.component.html',
  styleUrls: ['./trainer-pending.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerPendingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onCancelTrainer(): void { }

}
