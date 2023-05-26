import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Evaluation } from '../models/evaluation';
import { SecuritiesService } from '../services/security.service';

export interface ServerResponse {
  message: string;
  data: Evaluation[];
}

export interface SingleEvaluationResponse {
  message: string;
  data: Evaluation;
}


@Injectable({
  providedIn: 'root'
})
export class EvaluationsService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/Evaluations`, {headers});
  }

  create(theEvaluation:Evaluation): Observable<SingleEvaluationResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SingleEvaluationResponse>(`${environment.url_backend}/Evaluations`, theEvaluation, {headers});
  }

  update(theEvaluation:Evaluation): Observable<SingleEvaluationResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SingleEvaluationResponse>(`${environment.url_backend}/Evaluations/${theEvaluation.id}`, theEvaluation, {headers});
  }

  show(id:number): Observable<SingleEvaluationResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SingleEvaluationResponse>(`${environment.url_backend}/Evaluations/${id}`, {headers});
  }

  destroy(id:number): Observable<SingleEvaluationResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SingleEvaluationResponse>(`${environment.url_backend}/Evaluations/${id}`, {headers});
  }
}
