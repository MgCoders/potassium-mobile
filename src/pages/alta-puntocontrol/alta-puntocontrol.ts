import {Component, ElementRef, ViewChild} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {PuntoControl} from "../../app/_models/PuntoControl";
import {PuntoControlService} from "../../app/_services/punto-control.service";
import {PuntoControlImp} from "../../app/_models/PuntoControlImp";
import {Trabajo} from "../../app/_models/Trabajo";
import {UsuarioImp} from "../../app/_models/UsuarioImp";
import {UsuarioService} from "../../app/_services/usuario.service";
import {Usuario} from "../../app/_models/Usuario";

/**
 * Generated class for the AltaPuntoControl page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-puntocontrol',
  templateUrl: 'alta-puntocontrol.html',
})
export class AltaPuntoControlPage {

  trabajoActual: Trabajo;
  editar : boolean = false;


  pcSeleccionado : number;
  pcActual: PuntoControl;
  listaPC: PuntoControl[];
  listaUsuarios: Usuario[];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              //private as: AlertController,
              private pcService: PuntoControlService,
              private usuarioService: UsuarioService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {

    //this.trabajoSeleccionado = this.navParams.data['idTrabajo'];
    this.pcSeleccionado = this.navParams.data['idPc'];
    this.trabajoActual = this.navParams.data['trabajoActual'];

    this.editar = (this.pcSeleccionado != undefined);

    console.log("es edición:", this.editar);

    //this.trabajoActual = this.navParams.data['trabajoActual'];


    if(this.pcActual == undefined) {
      let tareas = new Array();
      let usuario = new UsuarioImp({    email: "", nombre: "", role: "", password: "" });
      this.pcActual = new PuntoControlImp({nombre:'', trabajo:this.trabajoActual, responsable: usuario,orden:0, tareas: tareas});
    }



    let toastError_ar_4 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });


    this.listaUsuarios = [];
    console.log("Traigo la lista de usuarios.");
    this.usuarioService.getAll().subscribe(
      (data) => {
        data.forEach( (usr) => {

          this.listaUsuarios.push( new UsuarioImp(usr));
        })
        console.log("Lista de usuarios después:", this.listaUsuarios);
      },
      (error) => {
        toastError_ar_4.setMessage(error);
        toastError_ar_4.present();
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaPuntoControlPage');
  }


  ionViewWillEnter() {

    //Limpio la lista
    this.listaPC = [];
    console.log("Entro a la lista de equipos");

    //console.log('ionViewDidLoad SeleccionaEquipoPage');
    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_apc = this.loadingCtrl.create({
      content: 'Cargando la lista de equipos...'
    });
    let toastCorrecto_apc = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_apc = this.toastCtrl.create({
      message: 'Error al obtener la lista de equipos..',
      duration: 3000,
      position: 'bottom'
    });


    if (this.editar){


      loading_apc.present();
      this.pcService.find(this.pcSeleccionado).subscribe(

        (data) => {
          loading_apc.dismissAll();

          console.log("P.C. traido desde la API:", data);

          //Obtengo la lista desde el server con lo último

          this.pcActual = new PuntoControlImp(data);

          console.log("pc después del llamado:",this.pcActual);
          toastCorrecto_apc.present();
        },
        (error) => {
          loading_apc.dismissAll();
          toastError_apc.setMessage(error.toString());
          toastError_apc.present();
        });
    }
  }

  guardarPC() {


    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_apc_2 = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto_apc_2 = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_apc_2 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    console.log("lo exporto");

    if(!this.validarCamposAltaPuntoControl()) {
      return;
    }


    loading_apc_2.present();
    if (!this.editar) {
      this.pcService.create(this.pcActual).subscribe(
        (data) => {
          toastCorrecto_apc_2.present();
          loading_apc_2.dismissAll();
          this.pcActual = new PuntoControlImp(data);
          this.navCtrl.pop();
        },
        (error) => {
          toastError_apc_2.setMessage(error);
          toastError_apc_2.present();
        });
    } else {
      this.pcService.edit(this.pcActual).subscribe(
        (data) => {
          toastCorrecto_apc_2.present();
          loading_apc_2.dismissAll();
          this.pcActual = new PuntoControlImp(data);
          this.navCtrl.pop();
        },
        (error) => {
          toastError_apc_2.setMessage(error);
          toastError_apc_2.present();
        });
    }
    console.log('Cliente después');
    console.log(this.pcActual);

  }





  validarCamposAltaPuntoControl(){

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";



    console.log("Validando puntoControl: ", this.pcActual.orden);
    console.log("Validando minutosEstimados: ", this.pcActual.tareas);
    console.log("Validando descripcion: ", this.pcActual.responsable);
    console.log("Validando nombre: ", this.pcActual.nombre);
    console.log("Validando nombre: ", this.pcActual.trabajo);


    if(valido && (this.pcActual.nombre == undefined || this.pcActual.nombre == "")){
      mensaje = 'No se ingresó nombre';
      valido = false;
    }

    if(valido && (this.pcActual.orden == undefined || this.pcActual.orden.toString() == "")){
      mensaje = 'No tiene orden';
      valido = false;
    }


    if(valido && (this.pcActual.responsable == undefined || this.pcActual.responsable.id == undefined)){
      mensaje = 'No se ingresó responsable';
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
