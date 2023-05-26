import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from './security.service';

export interface ServerResponse {
  message: string;
  data: Role[];
}

export interface SingleRoleResponse {
  message: string;
  data: Role;
}


@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/Roles`, {headers});
  }

  create(theRole:Role): Observable<SingleRoleResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SingleRoleResponse>(`${environment.url_backend}/Roles`, theRole, {headers});
  }

  update(theRole:Role): Observable<SingleRoleResponse> {
    console.log(JSON.stringify(theRole));
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SingleRoleResponse>(`${environment.url_backend}/Roles/${theRole.id}`, theRole, {headers});
  }

  show(id:number): Observable<SingleRoleResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SingleRoleResponse>(`${environment.url_backend}/Roles/${id}`, {headers});
  }

  destroy(id:number): Observable<SingleRoleResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SingleRoleResponse>(`${environment.url_backend}/Roles/${id}`, {headers});
  }
}
