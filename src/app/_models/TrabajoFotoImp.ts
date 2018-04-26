/**
 * Created by msteglich on 2/5/18.
 */
import * as models from './models';

export class TrabajoFotoImp implements models.TrabajoFoto {
  id?: number;
  trabajo: models.Trabajo;
  foto: string;
  descripcion: string;

    public constructor(x: models.TrabajoFoto) {
      this.id = x.id;
      this.trabajo = x.trabajo;
      this.foto = x.foto;
      this.descripcion = x.descripcion;
    }

}
