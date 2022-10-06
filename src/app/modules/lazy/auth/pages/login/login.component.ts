import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { ToastService } from '@app/modules/ui/toast';
import { PasswordValidators } from '@app/shared/validators';
import { AuthService } from '../../services/auth.service';
import { SpinnerService } from '@app/core/services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private translationService: TranslateService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email_address: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordValidators.default]]
    });
  }

  public onSubmitForm(): void {
    this.authService.login(this.form.value).subscribe((res: boolean) => {
      if (!res) {
        this.toastService.show({
          text: this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
        return;
      }
      this.router.navigateByUrl(CORE_ROUTE_NAMES.ADMIN);
    });
  }

}
