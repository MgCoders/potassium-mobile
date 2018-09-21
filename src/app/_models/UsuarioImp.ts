/**
 * Created by msteglich on 2/5/18.
 */
import * as models from './models';

export class UsuarioImp implements models.Usuario {
  id?: number;

  email: string;

  nombre: string;

  apellido: string;

  role: string;

  token?: string;

  login: boolean;

  password: string;

  usuarioRubros?: models.UsuarioRubro[];


  pin: string;

    public constructor(x: models.Usuario) {
      this.id = x.id;

      this.email= x.email;

      this.nombre= x.nombre;

      this.apellido= x.apellido;

      this.role= x.role;

      this.pin = x.pin;

      this.token = x.token;

      this.login = x.login;

      this.password= x.password;

      this.usuarioRubros = x.usuarioRubros;
    }

}
