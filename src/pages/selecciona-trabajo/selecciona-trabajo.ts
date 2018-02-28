import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {VerTrabajoPage} from "../ver-trabajo/ver-trabajo";
import {ListaTareaPage} from "../lista-tarea/lista-tarea";
import {ListaPuntocontrolPage} from "../lista-puntocontrol/lista-puntocontrol";

/**
 * Generated class for the SeleccionaTrabajoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selecciona-trabajo',
  templateUrl: 'selecciona-trabajo.html',
})
export class SeleccionaTrabajoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionaTrabajoPage');
  }



  verPuntosDeControl(){
    this.navCtrl.push(ListaPuntocontrolPage, {});
  }

  verTareas(){
    this.navCtrl.push(ListaTareaPage, {});
  }

  verFicha(){
    this.navCtrl.push(VerTrabajoPage, {});
  }

}
