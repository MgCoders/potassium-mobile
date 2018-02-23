import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {VerTrabajoPage} from "../ver-trabajo/ver-trabajo";

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
              private toastCtrl: ToastController,
              private events: Events) {
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

    this.events.publish('change-tab', 4, {});
    console.log("Sigo ejecución?");
    this.navCtrl.setRoot(VerTrabajoPage, {});
  }

}
