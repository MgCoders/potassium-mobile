import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  AlertController, Events, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {ClienteServices} from "../../app/_services/cliente.services";
import {AltaFirmaPage} from "../alta-firma/alta-firma";
import {AltaDescripcionPage} from "../alta-descripcion/alta-descripcion";
import {Cliente} from "../../app/_models/Cliente";

/**
 * Generated class for the IngresarDetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingresar-detalles',
  templateUrl: 'ingresar-detalles.html',
})
export class IngresarDetallesPage {

  lista: any[];
  comentarios: string;

  @ViewChild('myInput') myInput: ElementRef;





  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private as: AlertController,
              private service: ClienteServices,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private events: Events) {
    this.lista = [];
  }


  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresarDetallesPage');
  }

  confirmarDetalles(){
    this.events.publish('change-tab', 3, {});
  }


  callbackDetalle = (_params) => {
    return new Promise((resolve, reject) => {
      console.log("INGRESO::Seteo detalle");
      //console.log(this.firmaCliente64);
      this.lista.push(_params);
      //console.log(this.firmaCliente64);
      resolve();
    });
  };


  nuevoDetalle() {

    this.navCtrl.push(AltaDescripcionPage, {callback: this.callbackDetalle})

  }
}
