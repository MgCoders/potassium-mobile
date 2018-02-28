import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionaTareaPage');
  }

  cambiarEstado(){

  }

  cargarHoras(){

  }

  borraTarea(){

  }

}
