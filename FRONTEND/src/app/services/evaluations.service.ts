import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Evaluation } from '../models/evaluation';

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
  constructor(private http: HttpClient) { }

  index(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${environment.url_backend}/Evaluations`);
  }

  create(theEvaluation:Evaluation): Observable<SingleEvaluationResponse> {
    return this.http.post<SingleEvaluationResponse>(`${environment.url_backend}/Evaluations`, theEvaluation);
  }

  update(theEvaluation:Evaluation): Observable<SingleEvaluationResponse> {
    return this.http.put<SingleEvaluationResponse>(`${environment.url_backend}/Evaluations/${theEvaluation.id}`, theEvaluation);
  }

  show(id:number): Observable<SingleEvaluationResponse> {
    return this.http.get<SingleEvaluationResponse>(`${environment.url_backend}/Evaluations/${id}`);
  }

  destroy(id:number): Observable<SingleEvaluationResponse> {
    return this.http.delete<SingleEvaluationResponse>(`${environment.url_backend}/Evaluations/${id}`);
  }
}
