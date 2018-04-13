
import * as models from './models';

export interface PuntoControl {
    id?: number;

    nombre: string;

    trabajo: models.Trabajo;

    responsable?: models.Usuario;

    orden: number;

    tareas?: models.Tarea[];

}
