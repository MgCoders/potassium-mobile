import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {AltaTrabajoPage} from "../alta-trabajo/alta-trabajo";
import {AltaHorasPage} from "../alta-horas/alta-horas";

/**
 * Generated class for the SeleccionaTareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selecciona-tarea',
  templateUrl: 'selecciona-tarea.html',
})
export class SeleccionaTareaPage {


  estado: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.estado = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionaTareaPage');
  }

  cambiarEstado(){

  }

  cargarHoras(){
    this.navCtrl.push(AltaHorasPage);
  }

  borraTarea(){

  }

}
