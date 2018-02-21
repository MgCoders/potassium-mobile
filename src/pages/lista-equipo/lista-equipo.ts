import { Component } from '@angular/core';
import {
  AlertController, Events, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {Equipo} from "../../app/_models/Equipo";
import {EquipoServices} from "../../app/_services/equipo.service";
import {AltaEquipoPage} from "../alta-equipo/alta-equipo";
import {EquipoImp} from "../../app/_models/EquipoImp";

/**
 * Generated class for the ListaEquipoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-equipo',
  templateUrl: 'lista-equipo.html',
})
export class ListaEquipoPage {

  lista: Equipo[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private as: AlertController,
              private service: EquipoServices,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private events: Events) {
    this.lista = [];

  }



  nuevoEquipo() {
    this.navCtrl.push(AltaEquipoPage, {});
  }

  editarEquipo(id: number) {
    this.navCtrl.push(AltaEquipoPage, {id:id});
  }

  seleccionarEquipo(id: number ) {
    console.log('LISTA:: equipo seleccionado');
    console.log(id);

    this.events.publish('change-tab', 2, this.lista.find((x) => x.id === id));1
    //this.navCtrl.push(AltaEquipoPage, );
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad SeleccionaEquipoPage');
    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading = this.loadingCtrl.create({
      content: 'Cargando la lista de equipos...'
    });
    let toastCorrecto = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 6000,
      position: 'bottom'
    });
    let toastError = this.toastCtrl.create({
      message: 'Error al obtener la lista de equipos..',
      duration: 6000,
      position: 'bottom'
    });



    loading.present();
    this.service.getAll().subscribe(

      (data) => {
        loading.dismissAll();
        data.forEach(Equipo => {this.lista.push( new EquipoImp(Equipo));} )

        this.lista.sort(function(a, b) {
          return a.id - b.id;
        });
        console.log(this.lista);
        toastCorrecto.present();
      },
      (error) => {
        loading.dismissAll();
        toastError.setMessage(error);
        toastError.present();
      });
  }

}
