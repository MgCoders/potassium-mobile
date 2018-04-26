/**
 * Created by msteglich on 2/5/18.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {TrabajoFoto} from "../_models/TrabajoFoto";

@Injectable()
export class TrabajoFotoService {

    constructor(public http: HttpClient) { }

    getAll(): Observable<TrabajoFoto[]> {
        return this.http.get<TrabajoFoto[]>(`${environment.apiUrl}/trabajofotos/`);
    }

    get(id: number): Observable<TrabajoFoto> {
        return this.http.get<TrabajoFoto>(`${environment.apiUrl}/trabajofotos/` + id);
    }

    getByEstado(estado: string): Observable<TrabajoFoto[]> {
        return this.http.get<TrabajoFoto[]>(`${environment.apiUrl}/trabajofotos/estado/` + estado);
    }

    getByCliente(idCliente: number): Observable<TrabajoFoto[]> {
        return this.http.get<TrabajoFoto[]>(`${environment.apiUrl}/trabajofotos/cliente/` + idCliente);
    }

    getByEquipo(idEquipo: number): Observable<TrabajoFoto[]> {
        return this.http.get<TrabajoFoto[]>(`${environment.apiUrl}/trabajofotos/equipo/` + idEquipo);
    }

    create(x: TrabajoFoto): Observable<any> {
        return this.http.post(`${environment.apiUrl}/trabajofotos/`, x);
    }

    edit(x: TrabajoFoto): Observable<any> {
        return this.http.put(`${environment.apiUrl}/trabajofotos/` + x.id, x);
    }
}
