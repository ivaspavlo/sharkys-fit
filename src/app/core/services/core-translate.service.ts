import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { LANG_ID } from '../constants';
import { CoreStorageService } from './core-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CoreTranslateService {
  
  constructor(
    private translate: TranslateService,
    private storageSerive: CoreStorageService
  ) { }
  
  public instant(value: string): string {
    if (typeof value !== 'string') {
      return '';
    }
    return this.translate.instant(value);
  }
  
  public setDefaultLang(lang: string): void {
    if (typeof lang !== 'string') {
      return;
    }
    this.translate.setDefaultLang(lang);
  }
  
  public use(lang: string): Observable<any> {
    this.storageSerive.set(LANG_ID, lang);
    return this.translate.use(lang);
  }
  
  public getCurrentLang(): Observable<string> {
    return of(this.translate.currentLang);
  }
  
}