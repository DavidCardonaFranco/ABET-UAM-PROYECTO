import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';

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
  constructor(private http: HttpClient) { }

  index(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${environment.url_backend}/Activities`);
  }

  create(theActivity:Activity): Observable<SingleActivityResponse> {
    return this.http.post<SingleActivityResponse>(`${environment.url_backend}/Activities`, theActivity);
  }

  update(theActivity:Activity): Observable<SingleActivityResponse> {
    return this.http.put<SingleActivityResponse>(`${environment.url_backend}/Activities/${theActivity.id}`, theActivity);
  }

  show(id:number): Observable<SingleActivityResponse> {
    return this.http.get<SingleActivityResponse>(`${environment.url_backend}/Activities/${id}`);
  }

  destroy(id:number): Observable<SingleActivityResponse> {
    return this.http.delete<SingleActivityResponse>(`${environment.url_backend}/Activities/${id}`);
  }
}
