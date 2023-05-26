import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Indicator } from '../models/indicator';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from './security.service';

export interface ServerResponse {
  message: string;
  data: Indicator[];
}

export interface SingleIndicatorResponse {
  message: string;
  data: Indicator;
}


@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/Indicators`, {headers});
  }

  create(theIndicator:Indicator): Observable<SingleIndicatorResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SingleIndicatorResponse>(`${environment.url_backend}/Indicators`, theIndicator, {headers});
  }

  update(theIndicator:Indicator): Observable<SingleIndicatorResponse> {
    console.log(JSON.stringify(theIndicator));
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SingleIndicatorResponse>(`${environment.url_backend}/Indicators/${theIndicator.id}`, theIndicator, {headers});
  }

  show(id:number): Observable<SingleIndicatorResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SingleIndicatorResponse>(`${environment.url_backend}/Indicators/${id}`, {headers});
  }

  destroy(id:number): Observable<SingleIndicatorResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SingleIndicatorResponse>(`${environment.url_backend}/Indicators/${id}`, {headers});
  }
}
