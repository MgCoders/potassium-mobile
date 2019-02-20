import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AltaFirmaPage} from "../alta-firma/alta-firma";

/**
 * Generated class for the IngresarFirmaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingresar-firma',
  templateUrl: 'ingresar-firma.html',
})
export class IngresarFirmaPage {

  firmaCliente64: string;
  firmaEmpleado64: string;

  nombreCliente: string;
  nombreEmpleado: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private events: Events) {

    this.firmaCliente64 = 'assets/imgs/blanco.jpg';
    this.firmaEmpleado64 = 'assets/imgs/blanco.jpg';
    this.nombreCliente = "Sin ingresar...";
    this.nombreEmpleado = "Sin ingresar...";
  }

  ionViewWillEnter() {
    //this.seteoFirmas('');
    console.log("will ",  this.firmaCliente64);
  }

  ionViewDidLoad() {
    //this.seteoFirmas('');
    console.log("did ",  this.firmaCliente64);
  }


  finalizarTrabajo(){
    let toastCorrecto = this.toastCtrl.create({
      message: 'Trabajo cargado correctamente!',
      duration: 3000,
      position: 'bottom'
    });

    toastCorrecto.present();


    if (this.validarFirmas()){
      this.events.publish('change-tab', 4, {
        'firmaClienteRecepcion': this.firmaCliente64,
        'firmaEmpleadoRecepcion': this.firmaEmpleado64,
        'nombreClienteRecepcion': this.nombreCliente,
        'nombreEmpleadoRecepcion': this.nombreEmpleado
      });
    }
    return;
  }


  validarFirmas(){

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";

    console.log("Validando firmaCliente64: ", this.firmaCliente64);
    console.log("Validando firmaEmpleado64: ", this.firmaEmpleado64);
    console.log("Validando nombreCliente: ", this.nombreCliente);
    console.log("Validando nombreEmpleado: ", this.nombreEmpleado);


    if(valido && (this.firmaCliente64 == undefined ||this.firmaCliente64 == '')){
      mensaje = 'No se ingresó firma de cliente';
      valido = false;
    }
    if(valido && (this.firmaEmpleado64 == undefined ||this.firmaEmpleado64 == '')){
      mensaje = 'No se ingresó firma de empleado';
      valido = false;
    }
    if(valido && (this.nombreCliente == undefined ||this.nombreCliente == '')){
      mensaje = 'No se ingresó nombre de cliente';
      valido = false;
    }
    if(valido && (this.nombreEmpleado == undefined ||this.nombreEmpleado == '')){
      mensaje = 'No se ingresó nombre de empleado';
      valido = false;
    }


    //Estos campos no requieren validación
    //this.clienteActual.telefono
    //this.clienteActual.direccion

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    return valido;



  }


  callbackCliente = (_params) => {
    return new Promise((resolve, reject) => {
      console.log("INGRESO::Seteo cliente");
      //console.log(this.firmaCliente64);
      this.firmaCliente64 = _params['firma'];
      this.nombreCliente = _params['nombre'];
      //console.log(this.firmaCliente64);
      resolve();
    });
  };

  callbackEmpleado = (_params) => {
    return new Promise((resolve, reject) => {

      //console.log(this.firmaCliente64);
      this.firmaEmpleado64 = _params['firma'];
      this.nombreEmpleado = _params['nombre'];

      resolve();
    });
  };

  nuevaFirmaCliente() {

    this.navCtrl.push(AltaFirmaPage, {rol:"cliente", callback: this.callbackCliente})

  }

  nuevaFirmaEmpleado() {
    this.navCtrl.push(AltaFirmaPage, {rol:"empleado", callback: this.callbackEmpleado})
  }
}
