import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoreStorageService } from '../services';
import { ACCESS_TOKEN } from '../constants';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storage: CoreStorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.get(ACCESS_TOKEN);
    return token ?
      next.handle(this.addToken(request, token)) :
      next.handle(request);
  }

  private addToken<T>(request: HttpRequest<T>, token: any): HttpRequest<T> {
    return request.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
  }

}
