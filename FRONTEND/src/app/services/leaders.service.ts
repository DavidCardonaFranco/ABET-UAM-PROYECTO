import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Leader } from '../models/leader';

export interface ServerResponse {
  message: string;
  data: Leader[];
}

export interface SingleLeaderResponse {
  message: string;
  data: Leader;
}


@Injectable({
  providedIn: 'root'
})
export class LeadersService {
  constructor(private http: HttpClient) { }

  index(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${environment.url_backend}/Leaders`);
  }

  create(theLeader:Leader): Observable<SingleLeaderResponse> {
    return this.http.post<SingleLeaderResponse>(`${environment.url_backend}/Leaders`, theLeader);
  }

  update(theLeader:Leader): Observable<SingleLeaderResponse> {
    return this.http.put<SingleLeaderResponse>(`${environment.url_backend}/Leaders/${theLeader.id}`, theLeader);
  }

  show(id:number): Observable<SingleLeaderResponse> {
    return this.http.get<SingleLeaderResponse>(`${environment.url_backend}/Leaders/${id}`);
  }

  destroy(id:number): Observable<SingleLeaderResponse> {
    return this.http.delete<SingleLeaderResponse>(`${environment.url_backend}/Leaders/${id}`);
  }
}
