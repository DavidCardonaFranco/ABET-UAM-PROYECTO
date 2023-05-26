import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from './security.service';

export interface ServerResponse {
  message: string;
  data: Permission[];
}

export interface SinglePermissionResponse {
  message: string;
  data: Permission;
}


@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/Permissions`, {headers});
  }

  create(thePermission:Permission): Observable<SinglePermissionResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SinglePermissionResponse>(`${environment.url_backend}/Permissions`, thePermission, {headers});
  }

  update(thePermission:Permission): Observable<SinglePermissionResponse> {
    console.log(JSON.stringify(thePermission));
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SinglePermissionResponse>(`${environment.url_backend}/Permissions/${thePermission.id}`, thePermission, {headers});
  }

  show(id:number): Observable<SinglePermissionResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SinglePermissionResponse>(`${environment.url_backend}/Permissions/${id}`, {headers});
  }

  destroy(id:number): Observable<SinglePermissionResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SinglePermissionResponse>(`${environment.url_backend}/Permissions/${id}`, {headers});
  }
}
