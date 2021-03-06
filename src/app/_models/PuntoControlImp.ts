import { PuntoControl } from './PuntoControl';
import { TareaImp } from './TareaImp';
import { Tarea } from './Tarea';
import { Usuario } from './Usuario';
import { Trabajo } from './Trabajo';
import * as models from "./models";

export class PuntoControlImp implements PuntoControl {
    id?: number;

    nombre: string;

    trabajo: Trabajo;

    orden: number;

    tareas?: Tarea[];

    paraVerificar: boolean;

    responsable?: models.Usuario;
    verificado: boolean;

    responsable2?: models.Usuario;
    verificado2: boolean;

    constructor(x: PuntoControl) {
        this.id = (x.id != undefined) ? x.id : -1;
        this.nombre = x.nombre;
        this.responsable = x.responsable;
        this.orden = x.orden;
        this.trabajo = x.trabajo;
        this.verificado = x.verificado;
        this.tareas = new Array();
        this.paraVerificar = x.paraVerificar;

        this.verificado2 = x.verificado;
        this.responsable2 = x.responsable2;

        //console.log("x",x);
        // console.log("x.tareas",x.tareas);

        if(x.tareas != undefined){
          x.tareas.forEach(
              (y) => {
                  this.tareas.push(new TareaImp(y));
              });
        }
      console.log("Terminé de clonar el punto de control, original:", x);
      console.log("Terminé de clonar el punto de control, nuevo:", this);
    }

}
