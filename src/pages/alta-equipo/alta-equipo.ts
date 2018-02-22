import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Equipo} from "../../app/_models/Equipo";
import {EquipoServices} from "../../app/_services/equipo.service";
import {EquipoImp} from "../../app/_models/EquipoImp";

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
  editar: boolean;


  constructor(public navCtrl: NavController,
              private equipoService: EquipoServices,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
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

    //Inicializo en vacío
    this.equipoActual =  new EquipoImp({marca:'',modelo:'',matricula:'',color:''});

    let id = this.navParams.data['id'];

    if(id != undefined){
      console.log('Edicion de equipo!');
      this.editar = true;
      this.equipoService.get(id).subscribe(
        (data) => {
          toastCorrecto.present();
          loading.dismissAll();
          this.equipoActual = data;
        },
        (error) => {
          toastError.setMessage(error);
          toastError.present();
        });
    }
    console.log(this.equipoActual);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaEquipoPage');
  }


  guardarEquipo() {

    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
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

    console.log('Equipo antes');
    console.log(this.equipoActual);

    loading.present();
    if (!this.editar) {
      this.equipoService.create(this.equipoActual).subscribe(
        (data) => {
          toastCorrecto.present();
          loading.dismissAll();
          this.equipoActual = new EquipoImp(data);
        },
        (error) => {
          console.log(error);
          console.log(error.toString());
          toastError.setMessage(error);
          toastError.present();
        });
    } else {
      this.equipoService.edit(this.equipoActual).subscribe(
        (data) => {
          toastCorrecto.present();
          loading.dismissAll();
          this.equipoActual = new EquipoImp(data);
        },
        (error) => {
          toastError.setMessage(error);
          toastError.present();
        });
    }
    loading.dismissAll();
    console.log('Equipo después');
    console.log(this.equipoActual);

  }
}
