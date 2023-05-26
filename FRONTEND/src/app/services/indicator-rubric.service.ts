import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndicatorRubric } from '../models/indicator-rubric';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from './security.service';

export interface ServerResponse {
  message: string;
  data: IndicatorRubric[];
}

export interface SingleIndicatorRubricResponse {
  message: string;
  data: IndicatorRubric;
}


@Injectable({
  providedIn: 'root'
})
export class IndicatorsRubricsService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/IndicatorsRubrics`, {headers});
  }

  create(theIndicatorRubric:IndicatorRubric): Observable<SingleIndicatorRubricResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SingleIndicatorRubricResponse>(`${environment.url_backend}/IndicatorsRubrics`, theIndicatorRubric, {headers});
  }

  update(theIndicatorRubric:IndicatorRubric): Observable<SingleIndicatorRubricResponse> {
    console.log(JSON.stringify(theIndicatorRubric));
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SingleIndicatorRubricResponse>(`${environment.url_backend}/IndicatorsRubrics/${theIndicatorRubric.id}`, theIndicatorRubric, {headers});
  }

  show(id:number): Observable<SingleIndicatorRubricResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SingleIndicatorRubricResponse>(`${environment.url_backend}/IndicatorsRubrics/${id}`, {headers});
  }

  destroy(id:number): Observable<SingleIndicatorRubricResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SingleIndicatorRubricResponse>(`${environment.url_backend}/IndicatorsRubrics/${id}`, {headers});
  }
}
