import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-orders-info',
  templateUrl: './orders-info.component.html',
  styleUrls: ['./orders-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
