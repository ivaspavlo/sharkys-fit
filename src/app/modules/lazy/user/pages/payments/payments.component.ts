import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    this.payouts$ = this.userService.getPayoutsData();
  }

  public onSetupPayouts(): void {
    this.userService.setupPayouts({}).subscribe((res: boolean) => {
      if (!res) {
        this.toastService.show({
          text: this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      }
    });
  }

}
