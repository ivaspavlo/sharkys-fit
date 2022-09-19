import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { CoreStorageService } from '@core/services';
import { ACCESS_TOKEN } from '@app/core/constants';


export class ApiService {

  protected httpClient: HttpClient;
  protected storageService: CoreStorageService;
  protected apiUrl = API_URL;

  constructor(
    protected injector: Injector
  ) {
    this.httpClient = injector.get(HttpClient);
    this.storageService = injector.get(CoreStorageService);
  }

  public get<T>(path: string, options: { [param: string]: any } = {}): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${path}/`, { ...options, ...this.getHeadersWithJWT() });
  }

  public post<T>(path: string, body: any, options: { [param: string]: any } = {}): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}/${path}/`, body, { ...options, ...this.getHeadersWithJWT() });
  }

  public patch<T>(path: string, body: any, options: { [param: string]: any } = {}): Observable<T> {
    return this.httpClient.patch<T>(`${this.apiUrl}/${path}/`, body, { ...options, ...this.getHeadersWithJWT() });
  }

  public put<T>(path: string, body: any, options: { [param: string]: any } = {}): Observable<T> {
    return this.httpClient.put<T>(`${this.apiUrl}/${path}/`, body, { ...options, ...this.getHeadersWithJWT() });
  }

  public delete<T>(path: string, options: { [param: string]: any } = {}): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiUrl}/${path}/`, { ...options, ...this.getHeadersWithJWT() });
  }

  public getToken(): string | null {
    return this.storageService.get(ACCESS_TOKEN);
  }

  private getHeadersWithJWT(): { headers?: HttpHeaders } {
    const token = this.storageService.get(ACCESS_TOKEN);
    return token ? { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) } : {};
  }

}
