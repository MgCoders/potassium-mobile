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

    if(!this.validarCamposAltaCliente()) {
      return;

    }

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


  validarCamposAltaCliente(){

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";
    console.log("Validando Cliente: ", this.clienteActual);

    if(this.clienteActual == undefined){
      mensaje = 'Cliente no definido';
      valido = false;
    }


    if(valido && (this.clienteActual.nombreEmpresa == undefined || this.clienteActual.nombreEmpresa == '')){
      mensaje = 'Nombre de la empresa inválido';
      valido = false;
    }
    if(valido && (this.clienteActual.personaContacto == undefined || this.clienteActual.personaContacto == '')){
      mensaje = 'Persona de Contacto inválida';
      valido = false;
    }
    if(valido && (this.clienteActual.telefonoContacto == undefined || this.clienteActual.telefonoContacto == '')){
      mensaje = 'Teléfono de Contacto inválido';
      valido = false;
    }

    if(valido && (this.clienteActual.emailEmpresa != undefined && this.clienteActual.emailEmpresa.match(/@/g).length != 1)){
      mensaje = 'Revisar email';
      valido = false;
    }

    if(valido && (this.clienteActual.rut != undefined && (this.clienteActual.rut.length != 12) )){
      mensaje = 'Revisar RUT, largo 12 números y no puede tener espacio';
      valido = false;

    }


    if(valido && !this.validate_isRUT(this.clienteActual.rut) ){
      mensaje = 'RUT Inválido';
      valido = false;

    }


    //Estos campos no requieren validación
    //this.clienteActual.telefono
    //this.clienteActual.direccion

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    return valido;



  }



    validate_isRUT(rut: string) {
      if (rut != undefined && rut.length != 12){
        return false;
      }
      else
      {
        if (!/^([0-9])*$/.test(rut)){
          return false;
        }
        var dc = rut.substr(11, 1);
        var rut = rut.substr(0, 11);
        var total = 0;
        var factor = 2;

        var i = 10;
        for (i; i >= 0; i--) {
          total += (factor * parseInt(rut.substr(i, 1), 10));
          factor = (factor == 9)?2:++factor;
        }

        var dv = 11 - (total % 11);

        if (dv == 11){
          dv = 0;
        }else if(dv == 10){
          dv = 1;
        }
        console.log("dv:", dv);
        console.log("dc:", dc);

        if(dv.toString() == dc){
          return true;
        }
        return false;
      }
    }



}
