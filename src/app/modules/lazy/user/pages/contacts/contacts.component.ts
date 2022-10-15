import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { SpinnerService } from '@app/core/services';
import { IResponseApi } from '@app/core/interfaces';
import { DestroySubscriptions } from '@app/shared/classes';
import { ToastService } from '@app/modules/ui/toast';
import { UserService } from '../../services/user.service';
import { IUserAccount } from '../../interfaces';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent extends DestroySubscriptions implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private translationService: TranslateService,
    public spinnerService: SpinnerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.getCachedUserData().pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((data: IUserAccount | null) => {
      this.initForm(data);
    });
  }

  private initForm(data: IUserAccount | null): void {
    this.form = this.fb.group({
      name: [data ? `${data.first_name} ${data.last_name}` : '', [Validators.required, Validators.minLength(2)]],
      email_address: [data?.email_address, [Validators.required, Validators.email]],
      phone_number: [data?.phone_number, [Validators.required, Validators.minLength(7)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  public onSubmitForm(): void {
    this.userService.contact(this.form.value).subscribe((res: IResponseApi) => {
      if (!res.valid) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        this.toastService.show({
          text: this.translationService.instant('user.messages.contacted'),
          type: 'success'
        });
      }
    });
  }

}
