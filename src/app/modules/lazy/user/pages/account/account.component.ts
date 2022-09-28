import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { DialogService } from '@app/modules/ui';
import { UploadImageModalComponent } from '../../modals/upload-image-modal/upload-image-modal.component';
import { DestroySubscriptions } from '@app/shared/classes';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent extends DestroySubscriptions implements OnInit {

  public form: FormGroup;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.getAccountData().pipe(
      catchError(() => of({}))
    ).subscribe((res: object) => {
      this.initForm(res);
    });
  }

  private initForm(data: any): void {
    this.form = this.fb.group({
      firstName: [data.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [data.lastName, [Validators.required, Validators.minLength(2)]],
      email: [data.email, [Validators.required, Validators.email]],
      address: [data.address, [Validators.required, Validators.minLength(10)]],
      phoneNumber: [data.phoneNumber, [Validators.required, Validators.minLength(7)]],
      instagram: [data.instagram, [Validators.required, Validators.minLength(3)]],
      quote: [data.quote, [Validators.required, Validators.minLength(3)]],
      location: [data.location, [Validators.required, Validators.minLength(3)]],
      sports: [data.sports, [Validators.required, Validators.minLength(3)]],
      certification: [data.certification, [Validators.required, Validators.minLength(3)]],
      bio: [data.bio, [Validators.required, Validators.minLength(3)]]
    });
  }

  public onLoadImage(): void {
    this.dialogService.open(UploadImageModalComponent).afterClosed.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((req: any) => {
      console.log('works');
    });
  }

  public onSubmitForm(): void {
    this.isLoading = true;
    this.userService.updateAccount(this.form.value).pipe(
      catchError(() => of(false))
    ).subscribe((res: boolean) => {
      console.log('works');
    });
  }

}
