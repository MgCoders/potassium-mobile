import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SeleccionaTareaPage} from "../selecciona-tarea/selecciona-tarea";
import {Equipo} from "../../app/_models/Equipo";
import {Tarea} from "../../app/_models/Tarea";
import {EquipoServices} from "../../app/_services/equipo.service";
import {EquipoImp} from "../../app/_models/EquipoImp";
import {TareaService} from "../../app/_services/tarea.service";
import {TareaImp} from "../../app/_models/TareaImp";
import {AltaTareaPage} from "../alta-tarea/alta-tarea";

/**
 * Generated class for the ListaTareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-tarea',
  templateUrl: 'lista-tarea.html',
})
export class ListaTareaPage {

  lista: Tarea[];
  trabajoSeleccionado: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              //private as: AlertController,
              private tareaService: TareaService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaTareaPage');
  }



  ionViewWillEnter() {

    this.trabajoSeleccionado = this.navParams.data['idTrabajo'];


    //Limpio la lista
    this.lista = [];
    console.log("Entro a la lista de equipos");

    //console.log('ionViewDidLoad SeleccionaEquipoPage');
    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_lt = this.loadingCtrl.create({
      content: 'Cargando la lista de tareas...'
    });
    let toastCorrecto_lt = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_lt = this.toastCtrl.create({
      message: 'Error al obtener la lista de tareas..',
      duration: 3000,
      position: 'bottom'
    });


    loading_lt.present();
    this.tareaService.getAllByTrabajo(this.trabajoSeleccionado).subscribe(

      (data) => {
        loading_lt.dismissAll();

        //Obtengo la lista desde el server con lo último
        data.forEach (Tarea => {
          this.lista.push(new TareaImp(Tarea));
        });

        console.log("equipos del cliente:",this.lista);
        toastCorrecto_lt.present();
      },
      (error) => {
        loading_lt.dismissAll();
        toastError_lt.setMessage(error.toString());
        toastError_lt.present();
      }
    );
  }



  seleccionarTarea(id:number) {
    this.navCtrl.push(SeleccionaTareaPage, {id:id, trabajoSeleccionado:this.trabajoSeleccionado})
  }


  nuevaTarea() {
    this.navCtrl.push(AltaTareaPage, {idTrabajo: this.trabajoSeleccionado})
  }

  editarTarea() {

  }
}
