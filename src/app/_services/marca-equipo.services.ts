import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../_models/Cliente';
import { environment } from '../../environments/environment';
import {Equipo} from '../_models/Equipo';
import {MarcaEquipo} from "../_models/MarcaEquipo";
@Injectable()
export class MarcaEquipoService {
  constructor(public http: HttpClient) {}
  getAll(): Observable<MarcaEquipo[]> {
    return this.http.get<MarcaEquipo[]>(`${environment.apiUrl}/marcas/`);
  }
  get(id: number): Observable<MarcaEquipo> {
    return this.http.get<MarcaEquipo>(`${environment.apiUrl}/marcas/` + id);
  }
  create(x: MarcaEquipo): Observable<any> {
    return this.http.post(`${environment.apiUrl}/marcas/`, x);
  }
  edit(x: MarcaEquipo): Observable<any> {
    return this.http.put(`${environment.apiUrl}/marcas/` + x.id, x);
  }
}
