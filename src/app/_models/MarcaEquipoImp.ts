
import * as models from './models';
export class MarcaEquipoImp implements models.MarcaEquipo {
  id?: number;
  nombre: string
  constructor(x: models.MarcaEquipo) {
    this.id = x.id;
    this.nombre = x.nombre;
  }
}
