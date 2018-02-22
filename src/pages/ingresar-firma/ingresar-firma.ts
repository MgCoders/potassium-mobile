import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RecepcionPage} from "../recepcion/recepcion";
import {ListaTrabajoPage} from "../lista-trabajo/lista-trabajo";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresarFirmaPage');
  }


  finalizarTrabajo(){
    let toastCorrecto = this.toastCtrl.create({
      message: 'Trabajo cargado correctamente!',
      duration: 3000,
      position: 'bottom'
    });

    toastCorrecto.present();

    this.navCtrl.setRoot(ListaTrabajoPage, {});
  }

}
