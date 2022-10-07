import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '@app/core/services';
import { ToastService } from '@app/modules/ui/toast';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent implements OnInit {

  public payouts$: Observable<any[]>;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private translationService: TranslateService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.payouts$ = this.userService.getPayoutsData('some_id');
  }

  public onSetupPayouts(): void {
    this.userService.setupPayouts({ id: 'some_id' }).subscribe((res: boolean) => {
      if (!res) {
        this.toastService.show({
          text: this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      }
    });
  }

}
