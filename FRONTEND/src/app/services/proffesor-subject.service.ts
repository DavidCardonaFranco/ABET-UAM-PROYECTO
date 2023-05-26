import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProffesorSubject } from '../models/proffesor-subject';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from './security.service';

export interface ServerResponse {
  message: string;
  data: ProffesorSubject[];
}

export interface SingleProffesorSubjectResponse {
  message: string;
  data: ProffesorSubject;
}


@Injectable({
  providedIn: 'root'
})
export class ProffesorsSubjectsService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/ProffesorsSubjects`, {headers});
  }

  create(theProffesorSubject:ProffesorSubject): Observable<SingleProffesorSubjectResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SingleProffesorSubjectResponse>(`${environment.url_backend}/ProffesorsSubjects`, theProffesorSubject, {headers});
  }

  update(theProffesorSubject:ProffesorSubject): Observable<SingleProffesorSubjectResponse> {
    console.log(JSON.stringify(theProffesorSubject));
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SingleProffesorSubjectResponse>(`${environment.url_backend}/ProffesorsSubjects/${theProffesorSubject.id}`, theProffesorSubject, {headers});
  }

  show(id:number): Observable<SingleProffesorSubjectResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SingleProffesorSubjectResponse>(`${environment.url_backend}/ProffesorsSubjects/${id}`, {headers});
  }

  destroy(id:number): Observable<SingleProffesorSubjectResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SingleProffesorSubjectResponse>(`${environment.url_backend}/ProffesorsSubjects/${id}`, {headers});
  }
}
