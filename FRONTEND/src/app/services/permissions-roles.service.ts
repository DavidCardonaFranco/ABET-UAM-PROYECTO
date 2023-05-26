import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionRole } from '../models/permission-role';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { SecuritiesService } from './security.service';

export interface ServerResponse {
  message: string;
  data: PermissionRole[];
}

export interface SinglePermissionRoleResponse {
  message: string;
  data: PermissionRole;
}


@Injectable({
  providedIn: 'root'
})
export class PermissionsRolesService {
  constructor(private http: HttpClient, private securitiesService: SecuritiesService) { }

  index(): Observable<ServerResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<ServerResponse>(`${environment.url_backend}/PermissionsRoles`, {headers});
  }

  create(thePermissionRole:PermissionRole): Observable<SinglePermissionRoleResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.post<SinglePermissionRoleResponse>(`${environment.url_backend}/PermissionsRoles`, thePermissionRole, {headers});
  }

  update(thePermissionRole:PermissionRole): Observable<SinglePermissionRoleResponse> {
    console.log(JSON.stringify(thePermissionRole));
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<SinglePermissionRoleResponse>(`${environment.url_backend}/PermissionsRoles/${thePermissionRole.id}`, thePermissionRole, {headers});
  }

  show(id:number): Observable<SinglePermissionRoleResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.get<SinglePermissionRoleResponse>(`${environment.url_backend}/PermissionsRoles/${id}`, {headers});
  }

  destroy(id:number): Observable<SinglePermissionRoleResponse> {
    const headers = {
      'Authorization': `Bearer ${this.securitiesService.getToken()}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete<SinglePermissionRoleResponse>(`${environment.url_backend}/PermissionsRoles/${id}`, {headers});
  }
}
