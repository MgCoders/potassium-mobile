import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Equipo} from "../../app/_models/Equipo";
import {EquipoServices} from "../../app/_services/equipo.service";
import {EquipoImp} from "../../app/_models/EquipoImp";
import {TipoEquipoImp} from "../../app/_models/TipoEquipoImp";
import {TipoEquipo} from "../../app/_models/TipoEquipo";
import {TipoEquipoService} from "../../app/_services/tipoEquipo.service";

/**
 * Generated class for the AltaEquipoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-equipo',
  templateUrl: 'alta-equipo.html',
})
export class AltaEquipoPage {

  equipoActual: Equipo;
  listaTipoEquipo: TipoEquipo[];
  editar: boolean;


  constructor(public navCtrl: NavController,
              private equipoService: EquipoServices,
              private tipoEquipoService:TipoEquipoService,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {


    let loading_ae = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto_ae = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_ae = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    let te = new TipoEquipoImp({descripcion:'', dibujo: ''});

    //Inicializo en vacío
      this.equipoActual =  new EquipoImp({marca:'',modelo:'',matricula:'',color:'', numeroChasis: '', cliente:this.navParams.data['cliente'], descripcion: '' , tipoEquipo: te} );

    let id = this.navParams.data['id'];

    if(id != undefined){
      console.log('Edicion de equipo!');
      this.editar = true;
      this.equipoService.get(id).subscribe(
        (data) => {
          toastCorrecto_ae.present();
          loading_ae.dismissAll();
          this.equipoActual = data;
        },
        (error) => {
          toastError_ae.setMessage(error);
          toastError_ae.present();
        });
    }
    console.log(this.equipoActual);

    this.listaTipoEquipo = [];

    this.tipoEquipoService.getAll().subscribe(
      (data) => {

        data.forEach( item => {
          this.listaTipoEquipo.push(item);
        });

      },
      (error) => {
        console.log(error);

      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaEquipoPage');
  }


  guardarEquipo() {

    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_ae_2 = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto_ae_2 = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_ae_2 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    console.log('Equipo antes');
    console.log(this.equipoActual);

    loading_ae_2.present();
    if (!this.editar) {
      console.log('Creo un nuevo equipo');
      console.log(this.equipoActual);

      this.equipoService.create(this.equipoActual).subscribe(
        (data) => {
          toastCorrecto_ae_2.present();
          loading_ae_2.dismissAll();
          this.equipoActual = new EquipoImp(data);
        },
        (error) => {
          console.log(error.toString());
          toastError_ae_2.setMessage(error);
          toastError_ae_2.present();
        });
    } else {
      this.equipoService.edit(this.equipoActual).subscribe(
        (data) => {
          toastCorrecto_ae_2.present();
          loading_ae_2.dismissAll();
          this.equipoActual = new EquipoImp(data);
        },
        (error) => {
          toastError_ae_2.setMessage(error);
          toastError_ae_2.present();
        });
    }

    console.log('Equipo después');
    console.log(this.equipoActual);
    this.navCtrl.pop();
  }

  tipoSeleccionado(id:number){
    return id === this.equipoActual.tipoEquipo.idTipoEquipo;
  }
}
