import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../enviroments/enviroment';
import { Security } from '../models/security';
import { User } from '../models/user';
import { SingleUserResponse } from './user.service';

export interface ServerResponse {
  message: string;
  data: Security[];
  token?: string;
}

export interface SingleSecurityResponse {
  User: any;
  message: string;
  data: Security;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SecuritiesService {
  constructor(private http: HttpClient) { }

  login(theSecurity:Security): Observable<SingleSecurityResponse> {
    return this.http.post<SingleSecurityResponse>(`${environment.url_backend}/login`, {email: theSecurity.email, password: theSecurity.password})
      .pipe(tap(res => {
        if (res.token) {
          const tokenObject = res.token; // El objeto del token
          const tokenString = JSON.stringify(tokenObject); // Convertir el objeto en una cadena JSON
          const token = JSON.parse(tokenString).token;
          localStorage.setItem('token', token);
        }
        if (res.User){
          console.log('nombre: ' + res.User.name + '  role id:' + res.User.role_id);
          localStorage.setItem('role_id', res.User.role_id);
        }
      }));
  }

  logout(theSecurity:Security): Observable<SingleSecurityResponse> {
    localStorage.removeItem('token');
    return this.http.post<SingleSecurityResponse>(`${environment.url_backend}/logout`, theSecurity);
  }

  forgotPassword(theSecurity:Security): Observable<SingleSecurityResponse> {
    return this.http.post<SingleSecurityResponse>(`${environment.url_backend}/forgot`, theSecurity.email);
  }

  resetPassword(theSecurity:Security): Observable<SingleSecurityResponse> {
    return this.http.post<SingleSecurityResponse>(`${environment.url_backend}/reset`, theSecurity.email);
  }

  // Método para obtener el token
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getRole(): string {
    return localStorage.getItem('role_id') || '';
  }

  isLoggedIn(): boolean {
    return this.getToken() !== '';
  }
}
