import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SeleccionaClientePage} from "../selecciona-cliente/selecciona-cliente";
import {SeleccionaEquipoPage} from "../selecciona-equipo/selecciona-equipo";
import {IngresarDetallesPage} from "../ingresar-detalles/ingresar-detalles";
import {IngresarFirmaPage} from "../ingresar-firma/ingresar-firma";

/**
 * Generated class for the AltaTrabajoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-trabajo',
  templateUrl: 'alta-trabajo.html',
})
export class AltaTrabajoPage {
  tabCliente:any;
  tabEquipo:any;
  tabDetalles:any;
  tabFirma:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.tabCliente = SeleccionaClientePage;
      this.tabEquipo = SeleccionaEquipoPage;
      this.tabDetalles = IngresarDetallesPage;
      this.tabFirma = IngresarFirmaPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaTrabajoPage');
  }

}
