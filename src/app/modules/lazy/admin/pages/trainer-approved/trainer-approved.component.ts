import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@app/modules/ui/toast';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '@app/core/services';
import { CtrlPanelButtons } from '../../constants';
import { ICtrlPanelButton, ITrainer } from '../../interfaces';
import { AdminService } from '../../services/admin.service';


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
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    const trainerId = this.route.snapshot.params.id;
    this.trainer$ = this.adminService.getSingleTrainer(trainerId).pipe(
      map((res: any | null) => {
        this.isLoaded = true;
        if (res === null) {
          this.toastService.show({
            text: this.translationService.instant('core.http-errors.general'),
            type: 'warn'
          });
          return true;
        }
        return res;
      })
    );
  }

  public onCancelTrainer(trainer: ITrainer): void {
    this.adminService.cancelTrainer(trainer.id).subscribe((res: boolean) => {
      if (!res) {
        this.toastService.show({
          text: this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      }
    });
  }

}
