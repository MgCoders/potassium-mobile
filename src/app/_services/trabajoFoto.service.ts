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


    get(id: number): Observable<TrabajoFoto[]> {
        return this.http.get<TrabajoFoto[]>(`${environment.apiUrl}/trabajofotos/trabajo/` + id);
    }


    create(x: TrabajoFoto): Observable<any> {
        return this.http.post(`${environment.apiUrl}/trabajofotos/`, x);
    }

}
