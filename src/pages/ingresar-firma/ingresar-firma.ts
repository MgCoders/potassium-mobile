import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {VerTrabajoPage} from "../ver-trabajo/ver-trabajo";
import {AltaFirmaPage} from "../alta-firma/alta-firma";

/**
 * Generated class for the IngresarFirmaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingresar-firma',
  templateUrl: 'ingresar-firma.html',
})
export class IngresarFirmaPage {

  firmaCliente64: string;
  firmaEmpleado64: string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private events: Events) {

    this.firmaCliente64 = 'assets/imgs/blanco.jpg';
    this.firmaEmpleado64 = 'assets/imgs/blanco.jpg';

  }

  ionViewWillEnter() {
    //this.seteoFirmas('');
    console.log("will ",  this.firmaCliente64);
  }

  ionViewDidLoad() {
    //this.seteoFirmas('');
    console.log("did ",  this.firmaCliente64);
  }


  finalizarTrabajo(){
    let toastCorrecto = this.toastCtrl.create({
      message: 'Trabajo cargado correctamente!',
      duration: 3000,
      position: 'bottom'
    });

    toastCorrecto.present();

    this.events.publish('change-tab', 4, {});

  }


  callbackCliente = (_params) => {
    return new Promise((resolve, reject) => {
      console.log("INGRESO::Seteo cliente");
      //console.log(this.firmaCliente64);
      this.firmaCliente64 = _params;
      //console.log(this.firmaCliente64);
      resolve();
    });
  };

  callbackEmpleado = (_params) => {
    return new Promise((resolve, reject) => {
      console.log("INGRESO::Seteo cliente");
      //console.log(this.firmaCliente64);
      this.firmaEmpleado64 = _params;
      //console.log(this.firmaCliente64);
      resolve();
    });
  };

  nuevaFirmaCliente() {

    this.navCtrl.push(AltaFirmaPage, {rol:"cliente", callback: this.callbackCliente})

  }

  nuevaFirmaEmpleado() {
    this.navCtrl.push(AltaFirmaPage, {rol:"empleado", callback: this.callbackEmpleado})
  }
}
