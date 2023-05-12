import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';

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
  constructor(private http: HttpClient) { }

  index(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${environment.url_backend}/Subjects`);
  }

  create(theSubject:Subject): Observable<SingleSubjectResponse> {
    return this.http.post<SingleSubjectResponse>(`${environment.url_backend}/Subjects`, theSubject);
  }

  update(theSubject:Subject): Observable<SingleSubjectResponse> {
    console.log(JSON.stringify(theSubject));
    return this.http.put<SingleSubjectResponse>(`${environment.url_backend}/Subjects/${theSubject.id}`, theSubject);
  }

  show(id:number): Observable<SingleSubjectResponse> {
    return this.http.get<SingleSubjectResponse>(`${environment.url_backend}/Subjects/${id}`);
  }

  destroy(id:number): Observable<SingleSubjectResponse> {
    return this.http.delete<SingleSubjectResponse>(`${environment.url_backend}/Subjects/${id}`);
  }
}
