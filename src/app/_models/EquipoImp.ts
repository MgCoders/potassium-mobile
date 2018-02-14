/**
 * Created by msteglich on 2/5/18.
 */
import * as models from './models';

export class EquipoImp implements models.Equipo {
    id?: number;
    cliente: models.Cliente;
    marca: string;
    modelo: string;
    matricula: string;
    color: string;
    // tipoEquipo: models.TipoEquipo;
    constructor(x: models.Equipo) {
        this.id = x.id;
        this.cliente = x.cliente;
        this.marca = x.marca;
        this.modelo = x.modelo;
        this.matricula = x.matricula;
        this.color = x.color;
    }
}
