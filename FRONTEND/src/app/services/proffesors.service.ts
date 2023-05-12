import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Proffesor } from '../models/proffesor';

export interface ServerResponse {
  message: string;
  data: Proffesor[];
}

export interface SingleProffesorResponse {
  message: string;
  data: Proffesor;
}


@Injectable({
  providedIn: 'root'
})
export class ProffesorsService {
  constructor(private http: HttpClient) { }

  index(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${environment.url_backend}/Proffesors`);
  }

  create(theProffesor:Proffesor): Observable<SingleProffesorResponse> {
    return this.http.post<SingleProffesorResponse>(`${environment.url_backend}/Proffesors`, theProffesor);
  }

  update(theProffesor:Proffesor): Observable<SingleProffesorResponse> {
    return this.http.put<SingleProffesorResponse>(`${environment.url_backend}/Proffesors/${theProffesor.id}`, theProffesor);
  }

  show(id:number): Observable<SingleProffesorResponse> {
    return this.http.get<SingleProffesorResponse>(`${environment.url_backend}/Proffesors/${id}`);
  }

  destroy(id:number): Observable<SingleProffesorResponse> {
    return this.http.delete<SingleProffesorResponse>(`${environment.url_backend}/Proffesors/${id}`);
  }
}
