import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Tarea} from "../../app/_models/Tarea";
import {TareaImp} from "../../app/_models/TareaImp";
import {PuntoControlService} from "../../app/_services/punto-control.service";
import {PuntoControlImp} from "../../app/_models/PuntoControlImp";
import {PuntoControl} from "../../app/_models/PuntoControl";
import {AltaPuntoControlPage} from "../alta-puntocontrol/alta-puntocontrol";
import {Trabajo} from "../../app/_models/Trabajo";

/**
 * Generated class for the ListaPuntocontrolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-puntocontrol',
  templateUrl: 'lista-puntocontrol.html',
})
export class ListaPuntocontrolPage {


  lista: PuntoControl[];
  trabajoSeleccionado: number;
  trabajoActual: Trabajo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private pcService: PuntoControlService,
              private toastCtrl: ToastController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPuntocontrolPage');
  }


  ionViewWillEnter() {

    this.trabajoSeleccionado = this.navParams.data['idTrabajo'];

    //Cargo el trabajo, en teoría debería ser siempre el mismo
    this.trabajoActual = this.navParams.data['trabajoActual'];


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
    this.pcService.getByTrabajo(this.trabajoSeleccionado).subscribe(

      (data) => {
        loading_lt.dismissAll();

        console.log("P.C. por trabajo:", data);

        //Obtengo la lista desde el server con lo último
        data.forEach (pc => {
          this.lista.push(new PuntoControlImp(pc));
        });

        console.log("lista pc:",this.lista);
        toastCorrecto_lt.present();



      },
      (error) => {
        loading_lt.dismissAll();
        toastError_lt.setMessage(error.toString());
        toastError_lt.present();
      });

  }



  seleccionarPuntoControl(id: number) {
    this.navCtrl.push(AltaPuntoControlPage, {idPc:id, trabajoActual:this.trabajoActual});
  }


  nuevoPuntoControl(trabajo: Trabajo) {
    this.navCtrl.push(AltaPuntoControlPage, {trabajoActual:this.trabajoActual});
  }

  editarPuntoControl() {

  }

}
