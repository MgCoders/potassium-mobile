import {Component, ElementRef, ViewChild} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {TareaService} from "../../app/_services/tarea.service";
import {Tarea} from "../../app/_models/Tarea";
import {PuntoControl} from "../../app/_models/PuntoControl";
import {PuntoControlService} from "../../app/_services/punto-control.service";
import {TareaImp} from "../../app/_models/TareaImp";
import {PuntoControlImp} from "../../app/_models/PuntoControlImp";
import {Trabajo} from "../../app/_models/Trabajo";
import {UsuarioImp} from "../../app/_models/UsuarioImp";

/**
 * Generated class for the AltaTareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-tarea',
  templateUrl: 'alta-tarea.html',
})
export class AltaTareaPage {

  tareaActual: Tarea;
  trabajoSeleccionado : number;
  editar : boolean = false;
  trabajoActual: Trabajo;
  listaPC: PuntoControl[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              //private as: AlertController,
              private pcService: PuntoControlService,
              public loadingCtrl: LoadingController,
              private tareaService: TareaService,
              private toastCtrl: ToastController,
              public events: Events) {

    this.trabajoSeleccionado = this.navParams.data['idTrabajo'];

    this.editar = (this.trabajoSeleccionado != undefined);

    console.log("es edición:", this.editar);

    this.trabajoActual = this.navParams.data['trabajoActual'];


    if(this.tareaActual == undefined) {
      let tareas = new Array();
      let usuario = new UsuarioImp({    email: "", nombre: "", role: "", password: "" });
      let pc = new PuntoControlImp({nombre:'', trabajo:this.trabajoActual, responsable: usuario,orden:0, tareas: tareas});
      this.tareaActual = new TareaImp({nombre: "", descripcion:"",minutosEstimados: 0, puntoControl: pc});

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaTareaPage');
  }


  ionViewWillEnter() {

    //Limpio la lista
    this.listaPC = [];
    console.log("Entro a la lista de equipos");

    //console.log('ionViewDidLoad SeleccionaEquipoPage');
    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_lt = this.loadingCtrl.create({
      content: 'Cargando la lista de equipos...'
    });
    let toastCorrecto_lt = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_lt = this.toastCtrl.create({
      message: 'Error al obtener la lista de equipos..',
      duration: 3000,
      position: 'bottom'
    });


    loading_lt.present();
    this.pcService.getByTrabajo(this.trabajoSeleccionado).subscribe(

      (data) => {
        loading_lt.dismissAll();

        console.log("P.C. por trabajo:", data);

        //Obtengo la lista desde el server con lo último
        data.forEach (pc => {
          this.listaPC.push(new PuntoControlImp(pc));
        });

        console.log("lista pc:",this.listaPC);
        toastCorrecto_lt.present();
      },
      (error) => {
        loading_lt.dismissAll();
        toastError_lt.setMessage(error.toString());
        toastError_lt.present();
      });

  }

  guardarTarea() {


    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_at_2 = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto_at_2 = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_at_2 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    console.log("lo exporto");

    if(!this.validarCamposAltaTarea()) {
      return;
    }


    loading_at_2.present();
    if (!this.editar) {
      this.tareaService.create(this.tareaActual).subscribe(
        (data) => {
          toastCorrecto_at_2.present();
          loading_at_2.dismissAll();
          this.tareaActual = new TareaImp(data);
          this.navCtrl.pop();
        },
        (error) => {
          toastError_at_2.setMessage(error);
          toastError_at_2.present();
        });
    } else {
      this.tareaService.edit(this.tareaActual).subscribe(
        (data) => {
          toastCorrecto_at_2.present();
          loading_at_2.dismissAll();
          this.tareaActual = new TareaImp(data);
          this.navCtrl.pop();
        },
        (error) => {
          toastError_at_2.setMessage(error);
          toastError_at_2.present();
        });
    }
    console.log('Cliente después');
    console.log(this.tareaActual);

  }





  validarCamposAltaTarea(){

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";



    console.log("Validando puntoControl: ", this.tareaActual.puntoControl);
    console.log("Validando minutosEstimados: ", this.tareaActual.minutosEstimados);
    console.log("Validando descripcion: ", this.tareaActual.descripcion);
    console.log("Validando nombre: ", this.tareaActual.nombre);



    if(valido && (this.tareaActual.puntoControl == undefined || this.tareaActual.puntoControl.id == undefined)){
      mensaje = 'Error en el punto de control';
      valido = true;
    }

    if(valido && (this.tareaActual.minutosEstimados == undefined || this.tareaActual.minutosEstimados == 0)){
      mensaje = 'No se ingresó minutosEstimados';
      valido = true;
    }

    if(valido && (this.tareaActual.descripcion == undefined || this.tareaActual.descripcion == "")){
      mensaje = 'No se ingresó descripcion';
      valido = true;
    }

    if(valido && (this.tareaActual.nombre == undefined || this.tareaActual.nombre == "")){
      mensaje = 'No se ingresó nombre';
      valido = true;
    }

    //Estos campos no requieren validación
    //this.clienteActual.telefono
    //this.clienteActual.direccion

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    return valido;


  }


  @ViewChild('myInput') myInput: ElementRef;

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    console.log("comentarios: "+this.tareaActual.descripcion);
  }












}
