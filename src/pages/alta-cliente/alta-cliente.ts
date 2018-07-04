import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Cliente} from "../../app/_models/Cliente";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {ClienteServices} from "../../app/_services/cliente.services";
import {EquipoImp} from "../../app/_models/EquipoImp";

/**
 * Generated class for the AltaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-cliente',
  templateUrl: 'alta-cliente.html',
})
export class AltaClientePage {

  clienteActual: Cliente;
  editar: boolean;

  constructor(public navCtrl: NavController,
              private clienteServices: ClienteServices,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {

    /*let loading = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });*/

    //Inicializo en vacío
    this.clienteActual =  new ClienteImp({nombreEmpresa:'',personaContacto:'',telefonoContacto:''});

    let loading_ac = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto_ac = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_ac = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    let id = this.navParams.data['id'];

    if(id != undefined){
      console.log('Edicion de equipo!');
      this.editar = true;
      this.clienteServices.get(id).subscribe(
        (data) => {
          toastCorrecto_ac.present();
          loading_ac.dismissAll();
          this.clienteActual = data;
        },
        (error) => {
          toastError_ac.setMessage(error);
          toastError_ac.present();
        });
    }
    console.log(this.clienteActual);

  }

  ionViewDidLoad() {

  }

  guardarCliente() {

    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_ac_2 = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto_ac_2 = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_ac_2 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    console.log('Cliente antes');
    console.log(this.clienteActual);

    loading_ac_2.present();
    if (!this.editar) {
      this.clienteServices.create(this.clienteActual).subscribe(
        (data) => {
          toastCorrecto_ac_2.present();
          loading_ac_2.dismissAll();
          this.clienteActual = new ClienteImp(data);
          this.navCtrl.pop();
        },
        (error) => {
          toastError_ac_2.setMessage(error);
          toastError_ac_2.present();
        });
    } else {
      this.clienteServices.edit(this.clienteActual).subscribe(
        (data) => {
          toastCorrecto_ac_2.present();
          loading_ac_2.dismissAll();
          this.clienteActual = new ClienteImp(data);
          this.navCtrl.pop();
        },
        (error) => {
          toastError_ac_2.setMessage(error);
          toastError_ac_2.present();
        });
    }
    console.log('Cliente después');
    console.log(this.clienteActual);

  }
}
