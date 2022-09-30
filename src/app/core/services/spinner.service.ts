import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _isOn$ = new BehaviorSubject(false);
  public isOn$: Observable<boolean> = this._isOn$.asObservable();

  public on(): void {
    this._isOn$.next(true);
  }

  public off(): void {
    this._isOn$.next(false);
  }

}
