import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {TareaImp} from "../../app/_models/TareaImp";
import {TareaService} from "../../app/_services/tarea.service";
import {Tarea} from "../../app/_models/Tarea";
import {Trabajo} from "../../app/_models/Trabajo";
import {ListaRegistroPage} from "../lista-registro/lista-registro";

/**
 * Generated class for the SeleccionaTareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selecciona-tarea',
  templateUrl: 'selecciona-tarea.html',
})
export class SeleccionaTareaPage {


  //estado: number;
  lista: Tarea[];
  idTrabajoSeleccionada: number;
  idTareaSeleccionada: number;
  trabajoSeleccionado: Trabajo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tareaService: TareaService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

    //var p = new PuntoControlImp({nombre:'',trabajo,});
    //this.tareaSeleccionada = new TareaImp({nombre:'',descripcion:'',minutosEstimados:0,puntoControl:{} } );
    //this.estado = 1;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionaTareaPage');
  }


  ionViewWillEnter() {

    this.idTrabajoSeleccionada = this.navParams.data['id'];
    this.trabajoSeleccionado = this.navParams.data['trabajoSeleccionado'];



    console.log("Entro a la lista de equipos");

    //console.log('ionViewDidLoad SeleccionaEquipoPage');
    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_lt = this.loadingCtrl.create({
      content: 'Cargando tarea...'
    });

    let toastCorrecto_lt = this.toastCtrl.create({
      message: 'Tarea cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });

    let toastError_lt = this.toastCtrl.create({
      message: 'Error al obtener la tarea...',
      duration: 3000,
      position: 'bottom'
    });


    loading_lt.present();
    this.tareaService.get(this.idTrabajoSeleccionada).subscribe(

      (data) => {
        loading_lt.dismissAll();


        //Limpio la lista
        this.lista = [];


        console.log("lista: ", this.lista);

        //Obtengo la lista desde el server con lo último
        this.lista.push(new TareaImp(data));
        this.idTareaSeleccionada = data.id;

        console.log("Tarea:",this.lista);
        toastCorrecto_lt.present();
      },
      (error) => {
        loading_lt.dismissAll();
        toastError_lt.setMessage(error.toString());
        toastError_lt.present();
      }
    );
  }



  verReporteHoras(){
    this.navCtrl.push(ListaRegistroPage, {idTareaSeleccionada:this.idTareaSeleccionada});
  }



  borraTarea(){
    let alert = this.alertCtrl.create({
      title: 'Confirmar borrado',
      message: 'Realmente quiere borrar esta tarea?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Canceló, no se borra nada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirmó, Borro la tarea');
            //this.tareaService.borrar
          }
        }
      ]
    });
    alert.present();
    this.navCtrl.pop();
  }

}
