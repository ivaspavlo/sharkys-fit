import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    private toastService: ToastService
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
    this.authService.firstLogin(this.form.value).pipe(
      catchError(() => of(false))
    ).subscribe((res: boolean) => {
      this.toastService.show({
        text: 'Toast message',
        type: 'info',
        href: 'https://www.test.com'
      });
    });
  }

}
