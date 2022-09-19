import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastService } from '@app/modules/ui/toast';
import { PasswordValidators } from '@app/shared/validators';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

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
      password: ['', [Validators.required, PasswordValidators.default]]
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
