
import * as models from './models';

export interface PuntoControl {
  id?: number;

  nombre: string;

  trabajo: models.Trabajo;

  orden: number;

  tareas?: models.Tarea[];

  paraVerificar: boolean;

  responsable?: models.Usuario;
  verificado: boolean;

  responsable2?: models.Usuario;
  verificado2: boolean;

}
