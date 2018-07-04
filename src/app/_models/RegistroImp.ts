/**
 * Created by msteglich on 2/5/18.
 */
import * as models from './models';
import {Registro} from "./Registro";

export class RegistroImp implements models.Registro {
  id?: number;

  minutos: number;

  fecha: string;

  borrado?: number;

  usuario?: models.Usuario;

  tarea: models.Tarea;

  rubro?: models.Rubro;


    public constructor(x: models.Registro) {
      this.id = x.id;

      this.minutos= x.minutos;

      this.fecha= x.fecha;

      this.borrado= x.borrado;

      this.usuario = x.usuario;

      this.tarea= x.tarea;

      this.rubro = x.rubro;
    }

}
