import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, Events} from 'ionic-angular';
import {AltaClientePage} from "../alta-cliente/alta-cliente";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {Cliente} from "../../app/_models/Cliente";
import {ClienteServices} from "../../app/_services/cliente.services";
import { ToastController } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import {Trabajo} from "../../app/_models/Trabajo";
import {AltaRegistroPage} from "../alta-registro/alta-registro";
import {RegistroService} from "../../app/_services/registro.service";
import {RegistroImp} from "../../app/_models/RegistroImp";
import {Registro} from "../../app/_models/Registro";
import {TareaService} from "../../app/_services/tarea.service";
import {Tarea} from "../../app/_models/Tarea";
import {TareaImp} from "../../app/_models/TareaImp";


/**
 * Generated class for the ListaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-registro',
  templateUrl: 'lista-registro.html',

})





export class ListaRegistroPage {

  lista: Registro[];

  idTareaSeleccionada: number;
  tarea : Tarea;

  agregar : boolean = false;


  public trabajoActual: Trabajo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private registroService: RegistroService,
              private tareaService: TareaService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {

    this.idTareaSeleccionada = this.navParams.data['idTareaSeleccionada'];

  }



  ionViewDidLoad(){
    //this.filterText = "";
  }


  ionViewWillEnter() {

    this.agregar =false;

    //Limpio la lista
    this.lista = [];
    console.log("Entro a la lista de registros de la tarea:", this.idTareaSeleccionada);

    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_lr = this.loadingCtrl.create({
      content: 'Cargando la lista de registros...'
    });
    let toastCorrecto_lr = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_lr = this.toastCtrl.create({
      message: 'Error al obtener la lista de registros..',
      duration: 3000,
      position: 'bottom'
    });


    loading_lr.present();


    this.registroService.getAllByTarea(this.idTareaSeleccionada).subscribe(
      (data) => {
        data.forEach(reg => {
          this.lista.push( new RegistroImp(reg));
        });

        loading_lr.dismissAll();
        console.log("Lista registros Actualizada:", this.lista);
      },
      (error) => {
        toastError_lr.setMessage(error);
        loading_lr.dismissAll();
      }
    );








    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)

    let toastError_lr_2 = this.toastCtrl.create({
      message: 'Error al obtener la lista de registros..',
      duration: 3000,
      position: 'bottom'
    });




    this.tareaService.get(this.idTareaSeleccionada).subscribe(
      (data) => {

        this.tarea = new TareaImp(data);

        console.log("tarea:", this.tarea);

        this.agregar = (this.tarea != undefined) && (this.tarea.completa==false);

      },
      (error) => {
        toastError_lr_2.setMessage(error);
      }
    );


  }

  nuevoRegistroHoras(){
    this.navCtrl.push(AltaRegistroPage, {idTareaSeleccionada:this.idTareaSeleccionada, tarea:this.tarea});
  }

  editarRegistroHoras(reg:Registro){
    this.navCtrl.push(AltaRegistroPage, {idTareaSeleccionada:this.idTareaSeleccionada, tarea:this.tarea, registro: reg});
  }


}
