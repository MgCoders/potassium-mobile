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

    //agregados



    equipoDocumentos: boolean;

    equipoRadio: boolean;

    equipoExtintor: boolean;

    equipoBalizas: boolean;

    equipoLlaveRuedas: boolean;

    equipoHerramientas: boolean;

    equipoManuales: boolean;

    equipoFrenteRadio: boolean;

    equipoMangueraCabina: boolean;

    equipoCenicero: boolean;

    equipoGatoPalanca: boolean;

    equipoParabrisasSano: boolean;

    equipoVidriosLaterales: boolean;

    equipoVidriosLateralesSanos: boolean;

    equipoEspejos: boolean;

    equipoEspejosSanos: boolean;

    equipoSenalerosSanos: boolean;

    equipoLucesTraserasSanas: boolean;

    equipoRayones: boolean;

    equipoAbollones: boolean;

    equipoAuxiliar: boolean;

    equipoAuxiliarArmada: boolean;

    equipoCantidadCombustible: number;
    //@ManyToOne
    //private Usuario usuarioRecepcion;

    dibujoEquipoRecepcion: string; //Para el dibujito de cuando lo recibe, guardar el array de bytes
    dibujoAncho: number;
    dibujoAlto: number;

    kmEquipoRecepcion: number;

    firmaClienteRecepcion: string;
    firmaEmpleadoRecepcion: string;

    nombreClienteRecepcion: string;
    nombreEmpleadoRecepcion: string;

    nroOrdenCompra: number;


    paraFinalizar: boolean;


}
