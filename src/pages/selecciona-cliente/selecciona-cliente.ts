import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SeleccionaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selecciona-cliente',
  templateUrl: 'selecciona-cliente.html',
})
export class SeleccionaClientePage {
  clientes: Array<{nombre: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.clientes = [];
    for(let i = 1; i < 5; i++) {
      this.clientes.push({
        nombre: 'Cliente ' + i,
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionaClientePage');
  }

}
