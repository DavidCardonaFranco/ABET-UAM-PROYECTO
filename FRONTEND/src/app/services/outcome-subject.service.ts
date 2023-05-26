import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OutcomeSubject } from '../models/outcome-subject';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from './security.service';

export interface ServerResponse {
  message: string;
  data: OutcomeSubject[];
}

export interface SingleOutcomeSubjectResponse {
  message: string;
  data: OutcomeSubject;
}


@Injectable({
  providedIn: 'root'
})
export class OutcomesSubjectsService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/OutcomesSubjects`, {headers});
  }

  create(theOutcomeSubject:OutcomeSubject): Observable<SingleOutcomeSubjectResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SingleOutcomeSubjectResponse>(`${environment.url_backend}/OutcomesSubjects`, theOutcomeSubject, {headers});
  }

  update(theOutcomeSubject:OutcomeSubject): Observable<SingleOutcomeSubjectResponse> {
    console.log(JSON.stringify(theOutcomeSubject));
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SingleOutcomeSubjectResponse>(`${environment.url_backend}/OutcomesSubjects/${theOutcomeSubject.id}`, theOutcomeSubject, {headers});
  }

  show(id:number): Observable<SingleOutcomeSubjectResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SingleOutcomeSubjectResponse>(`${environment.url_backend}/OutcomesSubjects/${id}`, {headers});
  }

  destroy(id:number): Observable<SingleOutcomeSubjectResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SingleOutcomeSubjectResponse>(`${environment.url_backend}/OutcomesSubjects/${id}`, {headers});
  }
}
