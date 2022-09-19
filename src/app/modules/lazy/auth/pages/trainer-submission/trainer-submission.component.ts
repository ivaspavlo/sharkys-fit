import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { ISelectOption } from '@app/modules/ui/select/interfaces';
import { FavoriteLocationOptions } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-trainer-submission',
  templateUrl: './trainer-submission.component.html',
  styleUrls: ['./trainer-submission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerSubmissionComponent implements OnInit {

  public form: FormGroup;
  public favLocationOptions: ISelectOption[] = FavoriteLocationOptions;
  public success = false;

  constructor(
    private fb: FormBuilder,
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(7)]],
      trainingLocation: ['', [Validators.required, Validators.minLength(7)]],
      clientsQty: ['', [Validators.required]],
      cityOfInterest: ['', [Validators.required, Validators.minLength(3)]],
      sports: ['', [Validators.required, Validators.minLength(3)]],
      isCertified: ['', [Validators.required]],
      personalBackground: ['', [Validators.required, Validators.minLength(3)]],
      favoriteLocation: ['', [Validators.required]]
    });
  }

  public onSubmitForm(): void {
    this.service.submitTrainerData(this.form.value).pipe(
      catchError(() => of(false))
    ).subscribe((res: boolean) => {
      this.success = res;
    });
  }

}
