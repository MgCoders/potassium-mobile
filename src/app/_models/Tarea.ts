
import * as models from './models';

export interface Tarea {

  id?: number;
  nombre: string;
  descripcion: string;
  minutosEstimados: number;
  puntoControl: models.PuntoControl;
  completa: boolean;
  necesitaVerificacion: boolean;
  verificada: boolean;

}
