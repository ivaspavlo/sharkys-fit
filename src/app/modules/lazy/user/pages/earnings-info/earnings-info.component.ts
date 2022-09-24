import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-earnings-info',
  templateUrl: './earnings-info.component.html',
  styleUrls: ['./earnings-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EarningsInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
