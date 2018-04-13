import { Component } from '@angular/core';
import {
  AlertController, Events, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {VerTrabajoPage} from "../ver-trabajo/ver-trabajo";
import {ListaTareaPage} from "../lista-tarea/lista-tarea";
import {ListaPuntocontrolPage} from "../lista-puntocontrol/lista-puntocontrol";
import {ClienteServices} from "../../app/_services/cliente.services";
import {TrabajoService} from "../../app/_services/trabajo.service";
import {Trabajo} from "../../app/_models/Trabajo";
import {TrabajoImp} from "../../app/_models/TrabajoImp";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {EquipoImp} from "../../app/_models/EquipoImp";

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
              private as: AlertController,
              private service: TrabajoService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {

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
    let e = new EquipoImp({marca:'',modelo:'',matricula:'',color:''});

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
        //firmaEmpleadoRecepcion: '',
        nombreClienteRecepcion:'',
        //nombreEmpleadoRecepcion:'',
        nroFactura:0,
        nroRemito:0,
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
        dibujoEquipoRecepcion: ''}
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
          console.log("adentro",this.trabajoActual);
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
    this.navCtrl.push(ListaPuntocontrolPage, {id:id});
  }

  verTareas(id: number){
    this.navCtrl.push(ListaTareaPage, {id:id});
  }

  verFicha(id: number){
    this.navCtrl.push(VerTrabajoPage, {id:id});
  }

}
