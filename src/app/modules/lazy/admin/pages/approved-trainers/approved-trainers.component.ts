import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-approved-trainers',
  templateUrl: './approved-trainers.component.html',
  styleUrls: ['./approved-trainers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovedTrainersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
