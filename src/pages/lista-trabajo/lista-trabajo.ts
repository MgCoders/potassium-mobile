import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AltaClientePage} from "../alta-cliente/alta-cliente";
import {SeleccionaTrabajoPage} from "../selecciona-trabajo/selecciona-trabajo";

/**
 * Generated class for the ListaTrabajoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-trabajo',
  templateUrl: 'lista-trabajo.html',
})
export class ListaTrabajoPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaTrabajoPage');
  }

  verTrabajo(){
    this.navCtrl.push(SeleccionaTrabajoPage, {});
  }


}
