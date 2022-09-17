import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable()
export class TrainerSubmissionService {

  constructor(
    private http: HttpClient
  ) {}

  public submitTrainerData(value: any): Observable<any> {
    return of(true);
  }

}
