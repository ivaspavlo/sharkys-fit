import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onCancelTrainer(): void {
    
  }

}
