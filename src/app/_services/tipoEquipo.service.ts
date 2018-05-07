/**
 * Created by msteglich on 2/5/18.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {TipoEquipo} from "../_models/TipoEquipo";

@Injectable()
export class TipoEquipoService {

    constructor(public http: HttpClient) { }


    getAll(): Observable<TipoEquipo[]> {
        return this.http.get<TipoEquipo[]>(`${environment.apiUrl}/tiposequipos/`);
    }

}
