
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cliente } from '../_models/Cliente';
import { environment } from '../../environments/environment';
import {Equipo} from "../_models/Equipo";

@Injectable()
export class EquipoServices {

    constructor(public http: HttpClient) {}

    getAll(): Observable<Equipo[]> {
        return this.http.get<Equipo[]>(`${environment.apiUrl}/equipos/`);
    }

    get(id: number): Observable<Equipo> {
        return this.http.get<Equipo>(`${environment.apiUrl}/equipos/` + id);
    }

    getByMarticula(matricula: string): Observable<Equipo> {
        return this.http.get<Equipo>(`${environment.apiUrl}/equipos/matricula/` + matricula);
    }

    getByCliente(cliente: number): Observable<Equipo> {
        return this.http.get<Equipo>(`${environment.apiUrl}/equipos/cliente/` + cliente);
    }

    getByRut(rut: string): Observable<Cliente> {
        return this.http.get<Cliente>(`${environment.apiUrl}/clientes/rut/` + rut);
    }

    create(x: Cliente): Observable<any> {
        return this.http.post(`${environment.apiUrl}/clientes/`, x);
    }

    edit(x: Cliente): Observable<any> {
        return this.http.put(`${environment.apiUrl}/clientes/` + x.id, x);
    }
}
