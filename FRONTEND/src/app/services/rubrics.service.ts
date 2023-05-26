import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rubric } from '../models/rubric';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from './security.service';

export interface ServerResponse {
  message: string;
  data: Rubric[];
}

export interface SingleRubricResponse {
  message: string;
  data: Rubric;
}


@Injectable({
  providedIn: 'root'
})
export class RubricsService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/Rubrics`, {headers});
  }

  create(theRubric:Rubric): Observable<SingleRubricResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SingleRubricResponse>(`${environment.url_backend}/Rubrics`, theRubric, {headers});
  }

  update(theRubric:Rubric): Observable<SingleRubricResponse> {
    console.log(JSON.stringify(theRubric));
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SingleRubricResponse>(`${environment.url_backend}/Rubrics/${theRubric.id}`, theRubric, {headers});
  }

  show(id:number): Observable<SingleRubricResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SingleRubricResponse>(`${environment.url_backend}/Rubrics/${id}`, {headers});
  }

  destroy(id:number): Observable<SingleRubricResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SingleRubricResponse>(`${environment.url_backend}/Rubrics/${id}`, {headers});
  }
}
