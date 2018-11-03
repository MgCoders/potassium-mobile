import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Material } from '../_models/Material';
import { HttpClient } from '@angular/common/http';
/**
 * Created by pablo on 04/03/18.
 */
@Injectable()
export class MaterialService {

    constructor(public http: HttpClient) { }

    getAll(): Observable<Material[]> {
        return this.http.get<Material[]>(`${environment.apiUrl}/materiales/`);
    }

    getAll_x_Filtro(filtro: string): Observable<Material[]> {
      let url = `${environment.apiUrl}/materiales/autocomplete/` + encodeURIComponent(filtro);
      console.log("url", url);
      return this.http.get<Material[]>(url);
    }

    create(x: Material): Observable<any> {
        return this.http.post(`${environment.apiUrl}/materiales/`, x);
    }

    edit(x: Material): Observable<any> {
        return this.http.put(`${environment.apiUrl}/materiales/` + x.id, x);
    }

}
