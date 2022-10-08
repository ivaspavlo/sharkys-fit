import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '@app/core/services';
import { FavoriteLocationOptions } from '@app/core/constants';
import { IResponseApi } from '@app/core/interfaces';
import { DestroySubscriptions } from '@app/shared/classes';
import { DialogService } from '@app/modules/ui';
import { ToastService } from '@app/modules/ui/toast';
import { ISelectOption } from '@app/modules/ui/select/interfaces';
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
      if (res !== null) {
        this.initForm(res);
      }
    });
  }

  private initForm(data: IUserAccount): void {
    this.form = this.fb.group({
      id: [data.id, [Validators.required, Validators.minLength(2)]],
      first_name: [data.first_name, [Validators.required, Validators.minLength(2)]],
      last_name: [data.last_name, [Validators.required, Validators.minLength(2)]],
      email: [data.email, [Validators.required, Validators.email]],
      address: [data.address, [Validators.required, Validators.minLength(10)]],
      phone_number: [data.phone_number, [Validators.required, Validators.minLength(7)]],
      training_location: [data.training_location, [Validators.required, Validators.minLength(3)]],
      market_of_interest: [data.market_of_interest, [Validators.required, Validators.minLength(3)]],
      number_of_clients: [data.number_of_clients, [Validators.required]],
      favorite_location: [data.favorite_location, [Validators.required, Validators.minLength(3)]],
      specialization: [data.specialization, [Validators.required, Validators.minLength(3)]],
      bio: [data.bio, [Validators.required, Validators.minLength(30)]],
      certified_trainer: [data.certified_trainer, [Validators.required]],
      image_url: [data.image_url, [Validators.required]]
    });
  }

  public onLoadImage(): void {
    this.dialogService.open(UploadImageModalComponent).afterClosed.pipe(
      takeUntil(this.componentDestroyed$),
      switchMap((req: FormData | unknown) => {
        return req instanceof FormData ?
          this.userService.fileUpload(req) : of(null);
      })
    ).subscribe((res: IResponseApi | null) => {
      if (res && !res.value) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.file-upload'),
          type: 'warn'
        });
      } else if (res?.value) {
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
      if (!res.value) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        this.toastService.show({
          text: this.translationService.instant('user.messages.user-updated'),
          type: 'warn'
        });
      }
    });
  }

}
