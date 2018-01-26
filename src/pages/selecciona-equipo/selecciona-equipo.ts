import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SeleccionaEquipoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selecciona-equipo',
  templateUrl: 'selecciona-equipo.html',
})
export class SeleccionaEquipoPage {
  equipos: Array<{nombre: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.equipos = [];
    for(let i = 1; i < 5; i++) {
      this.equipos.push({
        nombre: 'Equipo ' + i,
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionaEquipoPage');
  }

}
