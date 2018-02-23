import { Component } from '@angular/core';
import {
  AlertController, Events, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {ClienteServices} from "../../app/_services/cliente.services";

/**
 * Generated class for the IngresarDetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingresar-detalles',
  templateUrl: 'ingresar-detalles.html',
})
export class IngresarDetallesPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private as: AlertController,
              private service: ClienteServices,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresarDetallesPage');
  }
  confirmarDetalles(){
    this.events.publish('change-tab', 3, {});
  }
}
