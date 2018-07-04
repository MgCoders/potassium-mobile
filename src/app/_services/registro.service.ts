import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {Registro} from "../_models/Registro";
import {Equipo} from "../_models/Equipo";

@Injectable()
export class RegistroService {

  constructor(public http: HttpClient) { }

  getAllByTarea(tareaId: number): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${environment.apiUrl}/registros/tarea/` + tareaId);
  }

  get(id: number): Observable<Registro> {
    return this.http.get<Registro>(`${environment.apiUrl}/registros/` + id);
  }

  create(x: Registro): Observable<any> {
    return this.http.post(`${environment.apiUrl}/registros/`, x);
  }

  edit(x: Registro): Observable<any> {
    return this.http.put(`${environment.apiUrl}/registros/` + x.id, x);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/registros/` + id);
  }

}
