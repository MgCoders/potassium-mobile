import { Component } from '@angular/core';
import {
  AlertController,
  Events, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {VerTrabajoPage} from "../ver-trabajo/ver-trabajo";
import {ListaTareaPage} from "../lista-tarea/lista-tarea";
import {ListaPuntocontrolPage} from "../lista-puntocontrol/lista-puntocontrol";
import {TrabajoService} from "../../app/_services/trabajo.service";
import {Trabajo} from "../../app/_models/Trabajo";
import {TrabajoImp} from "../../app/_models/TrabajoImp";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {EquipoImp} from "../../app/_models/EquipoImp";
import {TipoEquipoImp} from "../../app/_models/TipoEquipoImp";
import {MarcaEquipoImp} from "../../app/_models/MarcaEquipoImp";

/**
 * Generated class for the SeleccionaTrabajoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selecciona-trabajo',
  templateUrl: 'selecciona-trabajo.html',
})
export class SeleccionaTrabajoPage {

  trabajoActual: Trabajo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private trabajoService: TrabajoService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events,
              private alertCtrl: AlertController) {

    let loading = this.loadingCtrl.create({
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
    });



    //Inicializo el trabajo en vacío
    let c = new ClienteImp({nombreEmpresa:'',personaContacto:'',telefonoContacto:''});
    let te = new TipoEquipoImp({descripcion:'', dibujo: '', requiereInfoRecibo:false});
    let m = new MarcaEquipoImp( {id: -1, nombre: ''});

    //Inicializo en vacío
    let e =  new EquipoImp({marca:m,modelo:'',matricula:'',color:'', numeroChasis: '', cliente:this.navParams.data['cliente'], descripcion: '' , tipoEquipo: te} );

    this.trabajoActual =
      new TrabajoImp({
        cliente:c,
        equipo:e,
        motivoVisita: '',
        esReparacion: false,
        fechaRecepcion: '',
        fechaProvistaEntrega:'',
        requierePresupuesto:false,
        comentarios:'',
        estado:'',
        kmEquipoRecepcion:0,
        firmaClienteRecepcion: '',
        firmaEmpleadoRecepcion: '',
        nombreClienteRecepcion:'',
        nombreEmpleadoRecepcion:'',
        nroOrdenCompra: "",
        numeroTrabajo: "",
        cotizacion: "",
        equipoDocumentos:false,
        equipoAbollones:false,
        equipoAuxiliar:false,
        equipoAuxiliarArmada:false,
        equipoBalizas:false,
        equipoCantidadCombustible:0,
        equipoCenicero:false,
        equipoEspejos:false,
        equipoEspejosSanos:false,
        equipoExtintor:false,
        equipoFrenteRadio:false,
        equipoGatoPalanca:false,
        equipoHerramientas:false,
        equipoLlaveRuedas:false,
        equipoLucesTraserasSanas:false,
        equipoMangueraCabina:false,
        equipoManuales:false,
        equipoParabrisasSano:false,
        equipoRadio:false,
        equipoRayones:false,
        equipoSenalerosSanos:false,
        equipoVidriosLaterales:false,
        equipoVidriosLateralesSanos:false,
        dibujoEquipoRecepcion: '',
        dibujoAlto: 0,
        dibujoAncho:0,
        paraFinalizar: false,
        porcentajeCompleto:0}
      );



    console.log("navParams", this.navParams);
    let id = this.navParams.data['id'];
    console.log("id",id);

    loading.present();
    if(id != undefined){
      console.log('SeleccionaTrabajo!');
      this.trabajoService.get(id).subscribe(
        (data) => {
          toastCorrecto.present();
          loading.dismissAll();
          this.trabajoActual = data;
          //this.trabajoActual.paraFinalizar = true;
          console.log("Cargo el trabajo: ",this.trabajoActual);
        },
        (error) => {
          toastError.setMessage(error);
          toastError.present();
        });
    }
    loading.dismissAll();
    console.log("despues", this.trabajoActual);




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionaTrabajoPage');
  }



  verPuntosDeControl(id: number){
    this.navCtrl.push(ListaPuntocontrolPage, {idTrabajo:this.trabajoActual.id, trabajoActual:JSON.stringify(this.trabajoActual)});
  }

  verTareas(id: number){
    this.navCtrl.push(ListaTareaPage, {idTrabajo:id, trabajoActual:this.trabajoActual});
  }

  verFicha(id: number){
    this.navCtrl.push(VerTrabajoPage, {id:id});
  }


  cambiarEstadoTrabajo(title:string, message:string, estado:string){

    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Canceló, no se cambia nada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirmó, procesando solicitud');



            let loading = this.loadingCtrl.create({
              content: 'Procesando...'
            });
            let toastCorrecto = this.toastCtrl.create({
              message: 'Trabajo modificado correctamente!',
              duration: 3000,
              position: 'bottom'
            });
            let toastError = this.toastCtrl.create({
              message: 'Error al modificar el trabajo..',
              duration: 3000,
              position: 'bottom'
            });

            this.trabajoActual.estado = estado;

            loading.present();
            console.log('Cambiar estado trabajo!');
            this.trabajoService.edit(this.trabajoActual).subscribe(
              (data) => {
                toastCorrecto.present();
                loading.dismissAll();
                this.trabajoActual = data;
                console.log("adentro",this.trabajoActual);
              },
              (error) => {
                toastError.setMessage(error);
                toastError.present();
              });

            console.log("despues", this.trabajoActual);
          }
        }
      ]
    });
    alert.present();

  }



  switchFinTrabajo(tipo: number) {

    // **TIPO**
    // 1 es modificar
    // 2 es borrar

    console.log("Entro al switch");
    console.log("Tipo: ",tipo);


    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";

    if(valido && (this.trabajoActual == undefined || !this.trabajoActual.paraFinalizar)){
      mensaje = 'El Trabajo no está para finalizar';
      valido = false;
    }

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    if ( valido ) {


      if (tipo === 1) {
        if (this.trabajoActual.estado == 'FINALIZADO') {
          let estado = 'EN_PROCESO';
          let title = "Cambiar el estado a del trabajo";
          let message = "Realmente quere cambiar el estado a: EN PROCESO";
          this.cambiarEstadoTrabajo(title, message, estado);
        }
        else {

          let estado = 'FINALIZADO';
          let title = "Cambiar el estado a del trabajo";
          let message = "Realmente quere cambiar el estado a: FINALIZADO";
          this.cambiarEstadoTrabajo(title, message, estado);
        }
      } else {
        let estado = 'BORRADO';
        let title = 'Confirmar borrado';
        let message = "Realmente quere borrar el trabajo";
        this.cambiarEstadoTrabajo(title, message, estado);
      }
    }
  }

}
