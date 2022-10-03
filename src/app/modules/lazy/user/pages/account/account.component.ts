import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '@app/core/services';
import { DestroySubscriptions } from '@app/shared/classes';
import { DialogService } from '@app/modules/ui';
import { ToastService } from '@app/modules/ui/toast';
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
    this.userService.getAccountData().pipe(
      catchError(() => of({}))
    ).subscribe((res: object) => {
      this.initForm(res);
    });
  }

  private initForm(data: IUserAccount): void {
    this.form = this.fb.group({
      firstName: [data.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [data.lastName, [Validators.required, Validators.minLength(2)]],
      email: [data.email, [Validators.required, Validators.email]],
      address: [data.address, [Validators.required, Validators.minLength(10)]],
      phoneNumber: [data.phoneNumber, [Validators.required, Validators.minLength(7)]],
      instagram: [data.instagram, [Validators.required, Validators.minLength(3)]],
      quote: [data.quote, [Validators.required, Validators.minLength(3)]],
      location: [data.location, [Validators.required, Validators.minLength(3)]],
      sports: [data.sports, [Validators.required, Validators.minLength(3)]],
      certification: [data.certification, [Validators.required, Validators.minLength(3)]],
      bio: [data.bio, [Validators.required, Validators.minLength(3)]]
    });
  }

  public onLoadImage(): void {
    this.dialogService.open(UploadImageModalComponent).afterClosed.pipe(
      takeUntil(this.componentDestroyed$),
      switchMap((req: FormData | unknown) => {
        return req instanceof FormData ?
          this.userService.fileUpload(req) : of(null);
      })
    ).subscribe((res: boolean | null) => {
      if (res === false) {
        this.toastService.show({
          text: this.translationService.instant('core.http-errors.file-upload'),
          type: 'warn'
        });
      }
    });
  }

  public onSubmitForm(): void {
    this.userService.updateAccount(this.form.value).subscribe((res: boolean) => {
      if (!res) {
        this.toastService.show({
          text: this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      }
    });
  }

}
