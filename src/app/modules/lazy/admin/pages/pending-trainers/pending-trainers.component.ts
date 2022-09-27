import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pending-trainers',
  templateUrl: './pending-trainers.component.html',
  styleUrls: ['./pending-trainers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendingTrainersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
