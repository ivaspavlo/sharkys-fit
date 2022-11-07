import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '@app/core/services';
import { ToastService } from '@app/modules/ui';
import { IResponseApi, IUserContent } from '@app/interfaces';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserContentComponent implements OnInit {

  public form: FormGroup;
  public initFormValue: object; // public because it is used in canDeactivate guard

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private translationService: TranslateService,
    private adminService: AdminService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.adminService.getUserPageConent().subscribe((res: IResponseApi) => {
      this.initForm(res.data);
    });
  }

  private initForm(res: IUserContent): void {
    this.form = this.fb.group({
      account: [res?.account, [Validators.required]],
      payments: [res?.payments, [Validators.required]],
      starting: [res?.starting, [Validators.required]],
      earnings: [res?.earnings, [Validators.required]],
      orders: [res?.orders, [Validators.required]],
      promotions: [res?.promotions, [Validators.required]]
    });
    this.initFormValue = this.form.value;
  }

  public onSubmitForm(): void {
    this.adminService.updateUserPageContent(this.form.value).subscribe((res: IResponseApi) => {
      if (!res.valid) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        this.initFormValue = this.form.value;
        this.toastService.show({
          text: this.translationService.instant('admin.messages.user-content-updated'),
          type: 'success'
        });
      }
    });
  }

}
