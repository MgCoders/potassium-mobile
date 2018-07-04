/**
 * Created by msteglich on 2/5/18.
 */
import * as models from './models';
import {Registro} from "./Registro";

export class RubroImp implements models.Rubro {
  id?: number;

  nombre: string;

  descripcion: string;


    public constructor(x: models.Rubro) {
      this.id = x.id;

      this.nombre= x.nombre;

      this.descripcion= x.descripcion;

    }

}
