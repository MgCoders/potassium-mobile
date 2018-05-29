import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SeleccionaTareaPage} from "../selecciona-tarea/selecciona-tarea";
import {Equipo} from "../../app/_models/Equipo";
import {Tarea} from "../../app/_models/Tarea";

/**
 * Generated class for the ListaTareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-tarea',
  templateUrl: 'lista-tarea.html',
})
export class ListaTareaPage {

  lista: Tarea[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaTareaPage');
  }



  seleccionarTarea() {
    this.navCtrl.push(SeleccionaTareaPage, {})
  }


  nuevaTarea() {

  }

  editarTarea() {

  }
}
