import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Rubric } from '../models/rubric';

export interface ServerResponse {
  message: string;
  data: Rubric[];
}

export interface SingleRubricResponse {
  message: string;
  data: Rubric;
}


@Injectable({
  providedIn: 'root'
})
export class RubricsService {
  constructor(private http: HttpClient) { }

  index(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${environment.url_backend}/Rubrics`);
  }

  create(theRubric:Rubric): Observable<SingleRubricResponse> {
    return this.http.post<SingleRubricResponse>(`${environment.url_backend}/Rubrics`, theRubric);
  }

  update(theRubric:Rubric): Observable<SingleRubricResponse> {
    return this.http.put<SingleRubricResponse>(`${environment.url_backend}/Rubrics/${theRubric.id}`, theRubric);
  }

  show(id:number): Observable<SingleRubricResponse> {
    return this.http.get<SingleRubricResponse>(`${environment.url_backend}/Rubrics/${id}`);
  }

  destroy(id:number): Observable<SingleRubricResponse> {
    return this.http.delete<SingleRubricResponse>(`${environment.url_backend}/Rubrics/${id}`);
  }
}
