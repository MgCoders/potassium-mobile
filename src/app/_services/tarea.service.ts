import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TipoTarea } from '../_models/models';
import { Observable } from 'rxjs/Observable';
import { Tarea } from '../_models/Tarea';
import { TareaMaterial } from '../_models/TareaMaterial';

@Injectable()
export class TareaService {

  constructor(public http: HttpClient) { }

  getAll(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${environment.apiUrl}/tareas/`);
  }

  getAllByTrabajo(trabajoId: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${environment.apiUrl}/tareas/trabajo/` + trabajoId);
  }

  get(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${environment.apiUrl}/tareas/` + id);
  }

  create(x: Tarea): Observable<any> {
    return this.http.post(`${environment.apiUrl}/tareas/`, x);
  }

  edit(x: Tarea): Observable<any> {
        return this.http.put(`${environment.apiUrl}/tareas/` + x.id, x);
  }

  getAllMaterialesByTarea(tareaId: number): Observable<TareaMaterial[]> {
    return this.http.get<TareaMaterial[]>(`${environment.apiUrl}/tareas/` + tareaId + '/materiales');
  }

  createTareaMaterial(tm: TareaMaterial): Observable<any> {
    return this.http.post(`${environment.apiUrl}/tareas/materiales/`, tm);
  }

  editTareaMaterial(tm: TareaMaterial): Observable<any> {
    return this.http.put(`${environment.apiUrl}/tareas/materiales/` + tm.id, tm);
  }
}
