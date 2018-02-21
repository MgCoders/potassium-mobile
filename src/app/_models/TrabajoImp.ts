/**
 * Created by msteglich on 2/5/18.
 */
import * as models from './models';

export class TrabajoImp implements models.Trabajo {
    id?: number;
    cliente: models.Cliente;
    equipo: models.Equipo;
    motivoVisita: string;
    fechaRecepcion: string;
    fechaProvistaEntrega: string;
    requierePresupuesto: boolean;
    comentarios: string;
    estado: string;
    // dibujoEquipoRecepcion: string;
    kmEquipoRecepcion: number;
    // firmaClienteRecepcion: string;
    nombreClienteRecepcion: string;
    nroFactura: number;
    nroRemito: number;
    nroOrdenCompra: number;


    public constructor(x: models.Trabajo) {
        this.id = x.id;
        this.motivoVisita = x.motivoVisita;
        this.fechaRecepcion = x.fechaRecepcion;
        this.fechaProvistaEntrega = x.fechaProvistaEntrega;
        this.comentarios = x.comentarios;
        this.estado = x.estado;
        this.requierePresupuesto = x.requierePresupuesto;
        this.kmEquipoRecepcion = x.kmEquipoRecepcion;
        this.nombreClienteRecepcion = x.nombreClienteRecepcion;
        this.nroFactura = x.nroFactura;
        this.nroRemito = x.nroRemito;
        this.nroOrdenCompra = x.nroOrdenCompra;
        this.cliente = x.cliente;
        this.equipo = x.equipo
    }

}
