import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {Registro} from "../_models/Registro";
import {Equipo} from "../_models/Equipo";
import {Rubro} from "../_models/Rubro";

@Injectable()
export class RubroService {

  constructor(public http: HttpClient) { }

  getAll(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>(`${environment.apiUrl}/rubros/`);
  }

  get(id: number): Observable<Rubro> {
    return this.http.get<Rubro>(`${environment.apiUrl}/rubros/` + id);
  }

  create(x: Rubro): Observable<any> {
    return this.http.post(`${environment.apiUrl}/rubros/`, x);
  }

  edit(x: Rubro): Observable<any> {
    return this.http.put(`${environment.apiUrl}/rubros/` + x.id, x);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/rubros/` + id);
  }
}

