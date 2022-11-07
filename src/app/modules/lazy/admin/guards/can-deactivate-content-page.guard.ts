import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DialogService } from '@app/modules/ui';
import { DestroySubscriptions } from '@app/shared/classes';
import { ConfirmModalComponent } from '@app/shared/modals';
import { UserContentComponent } from '../pages/user-content/user-content.component';


@Injectable()
export class CanDeactivateContentPageGuard extends DestroySubscriptions implements CanDeactivate<any> {

  constructor(
    private dialogService: DialogService
  ) {
    super();
  }

  public canDeactivate(component: UserContentComponent): Observable<boolean> {
    if (JSON.stringify(component.initFormValue) === JSON.stringify(component.form.value)) {
      return of(true);
    }
    return this.dialogService.open(ConfirmModalComponent, {title: 'user.account.deactivate-title', icon: 'warn-orange'}).afterClosed.pipe(
      takeUntil(this.componentDestroyed$),
      map((res: boolean | undefined) => !!res)
    );
  }
}
