import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '@app/core/services';
import { IResponseApi } from '@app/core/interfaces';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { PasswordValidators } from '@app/shared/validators';
import { ToastService } from '@app/modules/ui/toast';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstLoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private translationService: TranslateService,
    private router: Router,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email_address: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordValidators.default]],
      confirm_password: ['', [Validators.required, PasswordValidators.passwordsEqual()]],
    });
  }

  public onSubmitForm(): void {
    // TODO: the source of user id to be clarified
    const req = {
      id: 'some_id',
      password: this.form.value.password,
      email_address: this.form.value.email_address
    };
    this.authService.firstLogin(req).subscribe((res: IResponseApi) => {
      if (!res.value) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        this.toastService.show({
          text: this.translationService.instant('first-login.success'),
          type: 'success'
        });
        this.router.navigateByUrl(CORE_ROUTE_NAMES.ADMIN);
      }
    });
  }

}
