import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent implements OnInit {

  public paymentsSet = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onSetupPayments(): void {
    this.paymentsSet = !this.paymentsSet;
  }

}
