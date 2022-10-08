import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FavoriteLocationOptions } from '@app/core/constants';
import { SpinnerService } from '@app/core/services';
import { IResponseApi } from '@app/core/interfaces';
import { ISelectOption } from '@app/modules/ui/select/interfaces';
import { ToastService } from '@app/modules/ui/toast';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-trainer-submission',
  templateUrl: './trainer-submission.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerSubmissionComponent implements OnInit {

  public form: FormGroup;
  public favLocationOptions: ISelectOption[] = FavoriteLocationOptions;
  public success = false;

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
      first_name: ['We will create an account automatically for you and include', [Validators.required, Validators.minLength(2)]],
      last_name: ['We will create an account automatically for you and include', [Validators.required, Validators.minLength(2)]],
      email: ['aaaaaa@gggg.com', [Validators.required, Validators.email]],
      address: ['We will create an account automatically for you and include', [Validators.required, Validators.minLength(10)]],
      phone_number: ['We will create an account automatically for you and include', [Validators.required, Validators.minLength(7)]],
      training_location: ['We will create an account automatically for you and include', [Validators.required, Validators.minLength(3)]],
      number_of_clients: ['11', [Validators.required]],
      market_of_interest: ['aaaaaa', [Validators.required, Validators.minLength(3)]],
      specialization: ['aaaaaaaa', [Validators.required, Validators.minLength(3)]],
      certified_trainer: ['most likely yes', [Validators.required]],
      bio: ['We will create an account automatically for you and include', [Validators.required, Validators.minLength(30)]],
      favorite_location: ['Tarzana', [Validators.required, Validators.minLength(3)]]
    });
  }

  public onSubmitForm(): void {
    this.authService.submitTrainerData(this.form.value).subscribe((res: IResponseApi) => {
      this.success = res.value;
      if (!res.value) {
        this.toastService.show({
          text: res.error_message || this.translationService.instant('core.http-errors.general'),
          type: 'warn'
        });
      }
    });
  }

}
