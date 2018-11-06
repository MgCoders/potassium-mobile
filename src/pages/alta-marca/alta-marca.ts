import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Cliente} from "../../app/_models/Cliente";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {ClienteServices} from "../../app/_services/cliente.services";
import {EquipoImp} from "../../app/_models/EquipoImp";
import {RegistroImp} from "../../app/_models/RegistroImp";
import {TareaImp} from "../../app/_models/TareaImp";
import {Registro} from "../../app/_models/Registro";
import {RegistroService} from "../../app/_services/registro.service";
import {Usuario} from "../../app/_models/Usuario";
import {Rubro} from "../../app/_models/Rubro";
import {UsuarioService} from "../../app/_services/usuario.service";
import {RubroService} from "../../app/_services/rubro.service";
import {UsuarioImp} from "../../app/_models/UsuarioImp";
import {RubroImp} from "../../app/_models/RubroImp";
import {Tarea} from "../../app/_models/Tarea";
import {MarcaEquipoService} from "../../app/_services/marca-equipo.services";
import {MarcaEquipo} from "../../app/_models/MarcaEquipo";
import {MarcaEquipoImp} from "../../app/_models/MarcaEquipoImp";

/**
 * Generated class for the AltaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-marca',
  templateUrl: 'alta-marca.html',
})
export class AltaMarcaPage {

  marcaActual: MarcaEquipo;

  constructor(public navCtrl: NavController,
              private marcaService: MarcaEquipoService,
              private usuarioService: UsuarioService,
              private rubroService: RubroService,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {

    this.marcaActual = new MarcaEquipoImp({ nombre: "" });
  }

  ionViewDidLoad() {

  }





  guardar(){


    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_am = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto_am = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_am = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });


    console.log('marcaActual antes');
    console.log(this.marcaActual);

    this.marcaActual.nombre = this.marcaActual.nombre.toUpperCase();



    if(!this.validarCamposAltaRegistro()) {
      return;
    }


    loading_am.present();

      this.marcaService.create(this.marcaActual).subscribe(
        (data) => {
          toastCorrecto_am.present();
          loading_am.dismissAll();
          this.marcaActual = new MarcaEquipoImp(data);
          console.log("Alta Marca: OK", this.marcaActual);
          this.navCtrl.pop();

        },
        (error) => {
          toastError_am.setMessage(error);
          toastError_am.present();
        });

    console.log('marcaActual después');
    console.log(this.marcaActual);


  }




  validarCamposAltaRegistro(){

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";

    console.log("Validando hoy: ", this.marcaActual.nombre);




    //if(valido && (this.registroActual.fecha == undefined || !this.registroActual.fecha.match(/\d\d-\d\d-\d\d\d\d \d\d:\d\d/g))){
    if(valido && (this.marcaActual.nombre == undefined || this.marcaActual.nombre == "") ) {
      mensaje = 'Nombre inválido';
      valido = false;
    }

    //Estos campos no requieren validación
    //this.clienteActual.telefono
    //this.clienteActual.direccion

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    return valido;


  }



}
