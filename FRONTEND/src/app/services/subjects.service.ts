import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from './security.service';

export interface ServerResponse {
  message: string;
  data: Subject[];
}

export interface SingleSubjectResponse {
  message: string;
  data: Subject;
}


@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/Subjects`, {headers});
  }

  create(theSubject:Subject): Observable<SingleSubjectResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SingleSubjectResponse>(`${environment.url_backend}/Subjects`, theSubject, {headers});
  }

  update(theSubject:Subject): Observable<SingleSubjectResponse> {
    console.log(JSON.stringify(theSubject));
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SingleSubjectResponse>(`${environment.url_backend}/Subjects/${theSubject.id}`, theSubject, {headers});
  }

  show(id:number): Observable<SingleSubjectResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SingleSubjectResponse>(`${environment.url_backend}/Subjects/${id}`, {headers});
  }

  destroy(id:number): Observable<SingleSubjectResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SingleSubjectResponse>(`${environment.url_backend}/Subjects/${id}`, {headers});
  }
}
