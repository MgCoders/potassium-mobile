import { PuntoControl } from './PuntoControl';
import { TareaImp } from './TareaImp';
import { Tarea } from './Tarea';
import { Usuario } from './Usuario';
import { Trabajo } from './Trabajo';

export class PuntoControlImp implements PuntoControl {
    id?: number;

    nombre: string;

    trabajo: Trabajo;

    responsable?: Usuario;

    orden: number;

    tareas?: Tarea[];

    constructor(x: PuntoControl) {
        this.nombre = x.nombre;
        this.responsable = x.responsable;
        this.orden = x.orden;
        this.trabajo = x.trabajo;
        this.tareas = new Array();
        console.log("x",x);
        console.log("x.tareas",x.tareas);

        if(x.tareas != undefined){
          x.tareas.forEach(
              (y) => {
                  this.tareas.push(new TareaImp(y));
              });
        }
      console.log("Terminé de setear el punto de control", this);

    }

}
