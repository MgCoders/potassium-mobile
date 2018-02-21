/**
 * Created by msteglich on 2/5/18.
 */
import * as models from './models';

export interface Trabajo {

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

}
