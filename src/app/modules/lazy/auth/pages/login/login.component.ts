import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CORE_ROUTE_NAMES } from '@core/constants';
import { SpinnerService, AuthService } from '@core/services';
import { IResponseApi } from '@app/interfaces';
import { ToastService } from '@app/modules/ui';


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
      password: ['', [Validators.required]]
    });
  }

  public onSubmitForm(): void {
    if (!this.form.valid) {
      return;
    }
    this.authService.login(this.form.value).subscribe((res: IResponseApi) => {
      if (!res.valid) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
        return;
      }
      this.router.navigateByUrl(
        this.authService.isAdmin() ? CORE_ROUTE_NAMES.ADMIN : CORE_ROUTE_NAMES.USER
      );
    });
  }

}
