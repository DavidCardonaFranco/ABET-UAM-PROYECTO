import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from './security.service';

export interface ServerResponse {
  message: string;
  data: User[];
}

export interface SingleUserResponse {
  message: string;
  data: User;
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/Users`, {headers});
  }

  create(theUser:User): Observable<SingleUserResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SingleUserResponse>(`${environment.url_backend}/Users`, theUser, {headers});
  }

  update(theUser:User): Observable<SingleUserResponse> {
    console.log(JSON.stringify(theUser));
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SingleUserResponse>(`${environment.url_backend}/Users/${theUser.id}`, theUser, {headers});
  }

  show(id:number): Observable<SingleUserResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SingleUserResponse>(`${environment.url_backend}/Users/${id}`, {headers});
  }

  destroy(id:number): Observable<SingleUserResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SingleUserResponse>(`${environment.url_backend}/Users/${id}`, {headers});
  }
}
