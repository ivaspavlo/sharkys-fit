import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IResponseApi } from '@app/interfaces';
import { CORE_ROUTE_NAMES } from '@core/constants';
import { AuthService, SpinnerService } from '@core/services';
import { PasswordValidators } from '@app/shared/validators';
import { ToastService } from '@app/modules/ui';

import { RESET_TOKEN } from '../../constants';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {

  public form: FormGroup;
  public resetToken: string;
  public success: boolean | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private route : ActivatedRoute,
    private translationService: TranslateService,
    private router: Router,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.resetToken = this.route.snapshot.params[RESET_TOKEN];
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, PasswordValidators.default]],
      confirmPassword: ['', [Validators.required, PasswordValidators.passwordsEqual()]]
    });
  }

  public onSubmitForm(): void {
    this.success = null;
    if (!this.form.valid) {
      return;
    }
    const req = {
      password: this.form.value.password,
      password_reset_token: this.resetToken
    };
    this.authService.resetPassword(req).subscribe((res: IResponseApi) => {
      if (!res.valid) {
        this.success = false;
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      } else {
        this.success = true;
        this.toastService.show({
          text: this.translationService.instant('reset-password.success.line-1'),
          type: 'success'
        });
        this.router.navigateByUrl(CORE_ROUTE_NAMES.AUTH);
      }
    });
  }

}
