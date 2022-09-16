import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-trainer-submission',
  templateUrl: './trainer-submission.component.html',
  styleUrls: ['./trainer-submission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerSubmissionComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder
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
      trainLocation: ['', [Validators.required, Validators.minLength(7)]],
      clientsQty: ['', [Validators.required]],
      cityOfInterest: ['', [Validators.required, Validators.minLength(3)]],
      sports: ['', [Validators.required, Validators.minLength(3)]],
      isCertified: ['', [Validators.required]],
      personalBackground: ['', [Validators.required, Validators.minLength(3)]],
      favoriteLocation: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

}
