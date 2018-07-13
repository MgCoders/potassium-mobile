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
              private service: TrabajoService,
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
    let te = new TipoEquipoImp({descripcion:'', dibujo: ''});
    //Inicializo en vacío
    let e =  new EquipoImp({marca:'',modelo:'',matricula:'',color:'', numeroChasis: '', cliente:this.navParams.data['cliente'], descripcion: '' , tipoEquipo: te} );

    this.trabajoActual =
      new TrabajoImp({
        cliente:c,
        equipo:e,
        motivoVisita: '',
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
        nroOrdenCompra:0,
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
        dibujoAncho:0}
      );



    console.log("navParams", this.navParams);
    let id = this.navParams.data['id'];
    console.log("id",id);

    loading.present();
    if(id != undefined){
      console.log('SeleccionaTrabajo!');
      this.service.get(id).subscribe(
        (data) => {
          toastCorrecto.present();
          loading.dismissAll();
          this.trabajoActual = data;
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

  borraTrabajo(id: number){


    let alert = this.alertCtrl.create({
      title: 'Confirmar borrado',
      message: 'Realmente quiere borrar este trabajo?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Canceló, no se borra nada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirmó, Borro el trabajo');


            /*
                        let loading = this.loadingCtrl.create({
                          content: 'Procesando...'
                        });
                        let toastCorrecto = this.toastCtrl.create({
                          message: 'Trabajo borrado!',
                          duration: 3000,
                          position: 'bottom'
                        });
                        let toastError = this.toastCtrl.create({
                          message: 'Error al borrar el trabajo..',
                          duration: 3000,
                          position: 'bottom'
                        });


                        loading.present();
                        if(id != undefined){
                          console.log('Borrar trabajo!');
                          this.service.borrar.subscribe(
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
                        }

                        loading.dismissAll();
                        loading.dismiss();*/

            console.log("despues", this.trabajoActual);
          }
        }
      ]
    });
    alert.present();

  }

}
