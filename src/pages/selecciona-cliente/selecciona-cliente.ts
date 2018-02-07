import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Cliente} from "../../app/_models/Cliente";
import {RecepcionPage} from "../recepcion/recepcion";
import {ClientePage} from "../cliente/cliente";

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
  clientes: Array<Cliente>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.clientes = [];
    for(let i = 1; i < 5; i++) {
      var c = {idCliente: i ,nombreEmpresa: 'Empresa'+i,personaContacto:'Cliente'+i, telefonoContacto: '00598'+i} as Cliente;
      this.clientes.push(c);
    }
  }

  nuevoCliente() {
    this.navCtrl.push(ClientePage, {});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionaClientePage');
  }

}
