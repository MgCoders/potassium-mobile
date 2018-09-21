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
  usrSeleccionado : number;
  usrSeleccionado2   : number;
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

    console.log("Vino por param. pcSeleccionado:", this.pcSeleccionado);
    console.log("Vino por param. trabajoActual:", this.trabajoActual);

    //this.trabajoActual = this.navParams.data['trabajoActual'];


    if(this.pcActual == undefined) {
      let tareas = new Array();
      let usuario = new UsuarioImp({    email: "", nombre: "", apellido:"", role: "", password: "", login:false, pin:"" });
      this.pcActual = new PuntoControlImp({nombre:'', trabajo:this.trabajoActual, responsable: usuario, responsable2: usuario, orden:0, tareas: tareas, verificado: false, verificado2: false, paraVerificar: false});
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
    console.log("Entro a la lista de PC");

    //console.log('ionViewDidLoad SeleccionaEquipoPage');
    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_apc = this.loadingCtrl.create({
      content: 'Cargando la lista de PC...'
    });
    let toastCorrecto_apc = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_apc = this.toastCtrl.create({
      message: 'Error al obtener la lista..',
      duration: 3000,
      position: 'bottom'
    });


    if (this.editar){


      let self = this;
      loading_apc.present();
      this.pcService.getByTrabajo(this.trabajoActual.id).subscribe(

        (data) => {
          loading_apc.dismissAll();

          console.log("P.C. traido desde la API:", data);
          let pcA = data.find(function(item){
            return item.id == self.pcSeleccionado;
          } );

          console.log("P.C. traido desde la API:", pcA);

          //Obtengo la lista desde el server con lo último

          this.pcActual = new PuntoControlImp(pcA);

          console.log("pc después del llamado:",this.pcActual);

          //el pc final no tiene responsable!
          this.usrSeleccionado = (this.pcActual.responsable != undefined) ? this.pcActual.responsable.id : -1;
          this.usrSeleccionado2 = (this.pcActual.responsable2 != undefined) ? this.pcActual.responsable2.id : -1;


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

    let self = this;
    this.pcActual.responsable = this.listaUsuarios.find(function(item){
      return item.id == self.usrSeleccionado;
    } );

    this.pcActual.responsable2 = this.listaUsuarios.find(function(item){
      return item.id == self.usrSeleccionado2;
    } );


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
          console.log(error);
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
          console.log(error);
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
    console.log("Validando tareas: ", this.pcActual.tareas);
    console.log("Validando responsable: ", this.pcActual.responsable);
    console.log("Validando responsable2: ", this.pcActual.responsable2);
    console.log("Validando nombre: ", this.pcActual.nombre);
    console.log("Validando trabajo: ", this.pcActual.trabajo);


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

    if(valido && (this.pcActual.responsable2 == undefined || this.pcActual.responsable2.id == undefined)){
      mensaje = 'No se ingresó responsable2';
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
