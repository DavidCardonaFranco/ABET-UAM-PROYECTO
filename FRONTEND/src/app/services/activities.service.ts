import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from '../services/security.service';

export interface ServerResponse {
  message: string;
  data: Activity[];
}

export interface SingleActivityResponse {
  message: string;
  data: Activity;
}

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/Activities`, { headers });
  }

  create(theActivity:Activity): Observable<SingleActivityResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SingleActivityResponse>(`${environment.url_backend}/Activities`, theActivity, { headers });
  }

  update(theActivity:Activity): Observable<SingleActivityResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SingleActivityResponse>(`${environment.url_backend}/Activities/${theActivity.id}`, theActivity, { headers });
  }

  show(id:number): Observable<SingleActivityResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SingleActivityResponse>(`${environment.url_backend}/Activities/${id}`, { headers });
  }

  destroy(id:number): Observable<SingleActivityResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SingleActivityResponse>(`${environment.url_backend}/Activities/${id}`, { headers });
  }
}
