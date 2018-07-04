import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {TareaService} from "../../app/_services/tarea.service";
import {Tarea} from "../../app/_models/Tarea";
import {PuntoControl} from "../../app/_models/PuntoControl";
import {PuntoControlService} from "../../app/_services/punto-control.service";
import {TareaImp} from "../../app/_models/TareaImp";
import {PuntoControlImp} from "../../app/_models/PuntoControlImp";

/**
 * Generated class for the AltaTareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-tarea',
  templateUrl: 'alta-tarea.html',
})
export class AltaTareaPage {

  tareaActual: Tarea;
  trabajoSeleccionado : number;
  listaPC: PuntoControl[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              //private as: AlertController,
              private pcService: PuntoControlService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaTareaPage');
  }


  ionViewWillEnter() {

    this.trabajoSeleccionado = this.navParams.data['idTrabajo'];

    //Limpio la lista
    this.listaPC = [];
    console.log("Entro a la lista de equipos");

    //console.log('ionViewDidLoad SeleccionaEquipoPage');
    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_lt = this.loadingCtrl.create({
      content: 'Cargando la lista de equipos...'
    });
    let toastCorrecto_lt = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_lt = this.toastCtrl.create({
      message: 'Error al obtener la lista de equipos..',
      duration: 3000,
      position: 'bottom'
    });


    loading_lt.present();
    this.pcService.getByTrabajo(this.trabajoSeleccionado).subscribe(

      (data) => {
        loading_lt.dismissAll();

        //Obtengo la lista desde el server con lo último
        data.forEach (pc => {
          this.listaPC.push(new PuntoControlImp(pc));
        });

        console.log("lista pc:",this.listaPC);
        toastCorrecto_lt.present();
      },
      (error) => {
        loading_lt.dismissAll();
        toastError_lt.setMessage(error.toString());
        toastError_lt.present();
      });

  }

    guardarTarea() {

    this.navCtrl.pop();
  }
}
