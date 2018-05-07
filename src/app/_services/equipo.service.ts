import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Equipo} from "../_models/Equipo";

@Injectable()
export class EquipoServices {

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${environment.apiUrl}/equipos/`);
  }

  get(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${environment.apiUrl}/equipos/` + id);
  }

  getByMarticula(matricula: string): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${environment.apiUrl}/equipos/matricula/` + matricula);
  }

  getByCliente(cliente: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${environment.apiUrl}/equipos/cliente/` + cliente);
  }

  getByRut(rut: string): Observable<Equipo> {
    return this.http.get<Equipo>(`${environment.apiUrl}/equipos/rut/` + rut);
  }

  create(x: Equipo): Observable<any> {
    return this.http.post(`${environment.apiUrl}/equipos/`, x);
  }

  edit(x: Equipo): Observable<any> {
    return this.http.put(`${environment.apiUrl}/equipos/` + x.id, x);
  }


}
