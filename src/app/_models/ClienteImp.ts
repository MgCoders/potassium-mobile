/**
 * Created by msteglich on 2/5/18.
 */
import * as models from './models';

export class ClienteImp implements models.Cliente {
    id?: number;
    nombreEmpresa: string;
    rut: string;
    telefono: string;
    personaContacto: string;
    telefonoContacto: string;
    emailEmpresa: string;
    direccion: string;

    constructor(x: models.Cliente) {
        this.id = x.id;
        this.nombreEmpresa = x.nombreEmpresa;
        this.rut = x.rut;
        this.telefono = x.telefono;
        this.personaContacto = x.personaContacto;
        this.telefonoContacto = x.telefonoContacto;
        this.emailEmpresa = x.emailEmpresa;
        this.direccion = x.direccion;
    }
}
