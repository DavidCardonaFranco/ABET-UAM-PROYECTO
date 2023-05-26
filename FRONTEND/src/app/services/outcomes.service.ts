import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Outcome } from '../models/outcome';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from './security.service';

export interface ServerResponse {
  message: string;
  data: Outcome[];
}

export interface SingleOutcomeResponse {
  message: string;
  data: Outcome;
}


@Injectable({
  providedIn: 'root'
})
export class OutcomesService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/StudentsOutcomes`, {headers});
  }

  create(theOutcome:Outcome): Observable<SingleOutcomeResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SingleOutcomeResponse>(`${environment.url_backend}/StudentsOutcomes`, theOutcome, {headers});
  }

  update(theOutcome:Outcome): Observable<SingleOutcomeResponse> {
    console.log(JSON.stringify(theOutcome));
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SingleOutcomeResponse>(`${environment.url_backend}/StudentsOutcomes/${theOutcome.id}`, theOutcome, {headers});
  }

  show(id:number): Observable<SingleOutcomeResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SingleOutcomeResponse>(`${environment.url_backend}/StudentsOutcomes/${id}`, {headers});
  }

  destroy(id:number): Observable<SingleOutcomeResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SingleOutcomeResponse>(`${environment.url_backend}/StudentsOutcomes/${id}`, {headers});
  }
}
