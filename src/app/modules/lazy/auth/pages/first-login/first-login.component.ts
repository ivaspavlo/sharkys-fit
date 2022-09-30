import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '@app/core/services';
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
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordValidators.default]],
      confirmPassword: ['', [Validators.required, PasswordValidators.passwordsEqual()]],
    });
  }

  public onSubmitForm(): void {
    this.authService.firstLogin(this.form.value).subscribe((res: boolean) => {
      if (res) {
        this.toastService.show({
          text: this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      }
    });
  }

}
