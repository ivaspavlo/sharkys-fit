import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@app/modules/ui/toast';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '@app/core/services';
import { CtrlPanelButtons, ROUTE_NAMES } from '../../constants';
import { ICtrlPanelButton, ITrainer } from '../../interfaces';
import { AdminService } from '../../services/admin.service';
import { IResponseApi } from '@app/core/interfaces';


@Component({
  selector: 'app-trainer-approved',
  templateUrl: './trainer-approved.component.html',
  styleUrls: ['./trainer-approved.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerApprovedComponent implements OnInit {

  public trainer$: Observable<ITrainer | true>;
  public buttons: ICtrlPanelButton[] = CtrlPanelButtons;
  public current: ICtrlPanelButton = this.buttons[0];
  public isLoaded = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private translationService: TranslateService,
    private router: Router,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    const trainerId = this.route.snapshot.params.id;
    this.trainer$ = this.adminService.getSingleTrainer(trainerId).pipe(
      map((res: IResponseApi) => {
        this.isLoaded = true;
        if (!res.value) {
          this.toastService.show({
            text: this.translationService.instant('core.http-errors.general'),
            type: 'warn'
          });
          return true;
        }
        return res.data;
      })
    );
  }

  public onCancelTrainer(trainer: ITrainer): void {
    this.adminService.cancelTrainer(trainer.id).subscribe((res: IResponseApi) => {
      if (!res.value) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        this.toastService.show({
          text: this.translationService.instant('admin.messages.trainer-cancelled'),
          type: 'success'
        });
        this.router.navigateByUrl(ROUTE_NAMES.APPROVED);
      }
    });
  }

}
