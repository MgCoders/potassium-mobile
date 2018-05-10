import { Component } from '@angular/core';
import {
  Events, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {ClienteImp} from "../../app/_models/ClienteImp";
import {TrabajoImp} from "../../app/_models/TrabajoImp";
import {EquipoImp} from "../../app/_models/EquipoImp";
import {TrabajoService} from "../../app/_services/trabajo.service";
import {Trabajo} from "../../app/_models/Trabajo";
import {TrabajoFoto} from "../../app/_models/TrabajoFoto";
import {TrabajoFotoService} from "../../app/_services/trabajoFoto.service";
import {TipoEquipoImp} from "../../app/_models/TipoEquipoImp";

/**
 * Generated class for the VerTrabajoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-trabajo',
  templateUrl: 'ver-trabajo.html',
})
export class VerTrabajoPage {

  trabajoActual: Trabajo;
  listaFoto: TrabajoFoto[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              //private as: AlertController,
              private trabajoService: TrabajoService,
              private trabajoFotoService: TrabajoFotoService,
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
      this.trabajoService.get(id).subscribe(
        (data) => {
          toastCorrecto.present();
          loading.dismissAll();
          this.trabajoActual = data;
          console.log("adentro",this.trabajoActual);
        },
        (error) => {
          toastError.setMessage(error);
          toastError.present();
        }
      );
    }
    loading.dismissAll();
    console.log("despues", this.trabajoActual);


    this.listaFoto = [];

    if(id != undefined){
      console.log('Descargo las fotos del trabajo (si tiene)!');
      this.trabajoFotoService.get(id).subscribe(
        (data) => {
          data.forEach( item => {
            this.listaFoto.push(item);
            console.log('Foto en el server!:', item);
          });

          console.log("adentro",this.trabajoActual);
        },
        (error) => {
          toastError.setMessage(error.toString());
        }
      );
    }
    loading.dismissAll();
    console.log("despues", this.trabajoActual)


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerTrabajoPage');
  }

}
