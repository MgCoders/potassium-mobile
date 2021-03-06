import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AltaTrabajoPage} from "../alta-trabajo/alta-trabajo";
import {ListaTrabajoPage} from "../lista-trabajo/lista-trabajo";

/**
 * Generated class for the RecepcionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recepcion',
  templateUrl: 'recepcion.html'
})


export class RecepcionPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecepcionPage');
  }

  trabajoNuevo(){
    this.navCtrl.push(AltaTrabajoPage, {tipo:false});
  }

  trabajoReparacion(){
    this.navCtrl.push(AltaTrabajoPage, {tipo:true});
  }

  recuperarTrabajos(){
    this.navCtrl.push(ListaTrabajoPage, {tipo:"recuperar"});
  }
}
