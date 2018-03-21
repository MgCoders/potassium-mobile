/**
 * Created by msteglich on 2/5/18.
 */
import * as models from './models';

export class UsuarioImp implements models.Usuario {
  id?: number;

  email: string;

  nombre: string;

  role: string;

  token?: string;

  password: string;

  usuarioRubros?: models.UsuarioRubro[];


    public constructor(x: models.Usuario) {
      this.id = x.id;

      this.email= x.email;

      this.nombre= x.nombre;

      this.role= x.role;

      this.token = x.token;

      this.password= x.password;

      this.usuarioRubros = x.usuarioRubros;
    }

}
