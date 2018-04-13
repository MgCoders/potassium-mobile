import * as models from './models';

export class TareaImp implements models.Tarea {
    id?: number;
    nombre: string;
    descripcion: string;
    minutosEstimados: number;
    puntoControl: models.PuntoControl;

    public constructor(x: models.Tarea) {
        this.id = x.id;
        this.nombre = x.nombre;
        this.descripcion = x.descripcion;
        this.minutosEstimados = x.minutosEstimados;
        this.puntoControl = x.puntoControl;
    }

}
