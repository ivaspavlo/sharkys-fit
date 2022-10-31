import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IResponseApi } from '@app/interfaces';
import { SpinnerService } from '@core/services';
import { FavoriteLocationOptions } from '@core/constants';
import { DestroySubscriptions } from '@app/shared/classes';
import { DialogService, ToastService, ISelectOption } from '@app/modules/ui';

import { UploadImageModalComponent } from '../../modals/upload-image-modal/upload-image-modal.component';
import { UserService } from '../../services/user.service';
import { IUserAccount } from '../../interfaces';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent extends DestroySubscriptions implements OnInit {

  public form: FormGroup;
  public favLocationOptions: ISelectOption[] = FavoriteLocationOptions;
  public initFormValue: object; // used in canDeactivate guard

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private translationService: TranslateService,
    public spinnerService: SpinnerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.getCachedUserData().pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((res: IUserAccount | null) => {
      if (!res) {
        return;
      }
      if (!this.form) {
        this.initForm(res);
      }
      if (res.image_url !== this.form.value.image_url) {
        return this.form.get('image_url')?.patchValue(res.image_url);
      }
    });
  }

  private initForm(data: IUserAccount): void {
    this.form = this.fb.group({
      id: [data.id, [Validators.required, Validators.minLength(2)]],
      first_name: [data.first_name, [Validators.required, Validators.minLength(2)]],
      last_name: [data.last_name, [Validators.required, Validators.minLength(2)]],
      email_address: [data.email_address, [Validators.required, Validators.email]],
      address: [data.address, [Validators.required, Validators.minLength(10)]],
      phone_number: [data.phone_number, [Validators.required, Validators.minLength(7)]],
      training_location: [data.training_location, [Validators.required, Validators.minLength(3)]],
      market_of_interest: [data.market_of_interest, [Validators.required, Validators.minLength(3)]],
      number_of_clients: [data.number_of_clients, [Validators.required]],
      favorite_location: [data.favorite_location, [Validators.required, Validators.minLength(3)]],
      specialization: [data.specialization, [Validators.required, Validators.minLength(3)]],
      bio: [data.bio, [Validators.required, Validators.minLength(30)]],
      certified_trainer: [data.certified_trainer, [Validators.required]],
      image_url: [data.image_url]
    });
    this.initFormValue = this.form.value;
  }

  public onLoadImage(): void {
    this.dialogService.open(UploadImageModalComponent).afterClosed.pipe(
      takeUntil(this.componentDestroyed$),
      switchMap((req: FormData | unknown) => {
        if (req instanceof FormData) {
          req.append('id', this.form.value.id);
          return this.userService.fileUpload(req);
        }
        return of(null);
      })
    ).subscribe((res: IResponseApi | null) => {
      if (res && !res.valid) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.file-upload'),
          type: 'warn'
        });
      } else if (res?.valid) {
        this.form.get('image_url')?.patchValue(res.data.url);
        this.toastService.show({
          text: this.translationService.instant('user.messages.file-uploaded'),
          type: 'success'
        });
      }
    });
  }

  public onSubmitForm(): void {
    this.userService.updateAccount(this.form.value).subscribe((res: IResponseApi) => {
      if (!res.valid) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        this.toastService.show({
          text: this.translationService.instant('user.messages.user-updated'),
          type: 'success'
        });
      }
    });
  }

}
