import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {TareaImp} from "../../app/_models/TareaImp";
import {TareaService} from "../../app/_services/tarea.service";
import {Tarea} from "../../app/_models/Tarea";
import {Trabajo} from "../../app/_models/Trabajo";
import {ListaRegistroPage} from "../lista-registro/lista-registro";

/**
 * Generated class for the SeleccionaTareaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selecciona-tarea',
  templateUrl: 'selecciona-tarea.html',
})
export class SeleccionaTareaPage {


  //estado: number;
  lista: Tarea[];
  idTrabajoSeleccionada: number;
  idTareaSeleccionada: number;
  trabajoSeleccionado: Trabajo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tareaService: TareaService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

    //var p = new PuntoControlImp({nombre:'',trabajo,});
    //this.tareaSeleccionada = new TareaImp({nombre:'',descripcion:'',minutosEstimados:0,puntoControl:{} } );
    //this.estado = 1;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionaTareaPage');
  }


  ionViewWillEnter() {

    this.idTrabajoSeleccionada = this.navParams.data['id'];
    this.trabajoSeleccionado = this.navParams.data['trabajoSeleccionado'];



    console.log("Entro a la lista de equipos");

    //console.log('ionViewDidLoad SeleccionaEquipoPage');
    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_lt = this.loadingCtrl.create({
      content: 'Cargando tarea...'
    });

    let toastCorrecto_lt = this.toastCtrl.create({
      message: 'Tarea cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });

    let toastError_lt = this.toastCtrl.create({
      message: 'Error al obtener la tarea...',
      duration: 3000,
      position: 'bottom'
    });


    loading_lt.present();
    this.tareaService.get(this.idTrabajoSeleccionada).subscribe(

      (data) => {
        loading_lt.dismissAll();


        //Limpio la lista
        this.lista = [];


        console.log("lista: ", this.lista);

        //Obtengo la lista desde el server con lo último
        this.lista.push(new TareaImp(data));
        this.idTareaSeleccionada = data.id;

        console.log("Tarea:",this.lista);
        toastCorrecto_lt.present();
      },
      (error) => {
        loading_lt.dismissAll();
        toastError_lt.setMessage(error.toString());
        toastError_lt.present();
      }
    );
  }



  verReporteHoras(){
    this.navCtrl.push(ListaRegistroPage, {idTareaSeleccionada:this.idTareaSeleccionada});
  }



  completarTarea(){
    let alert = this.alertCtrl.create({
      title: 'Confirmar tarea completada',
      message: '¿Realmente quiere dar por completa esta tarea?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Canceló, no se ha cambiado nada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {



            //Tengo que actualizar
            let loading_lt_2 = this.loadingCtrl.create({
              content: 'Actualizando la tarea...'
            });
            let toastCorrecto_lt_2 = this.toastCtrl.create({
              message: 'Tarea actualizada correctamente!',
              duration: 3000,
              position: 'bottom'
            });


            loading_lt_2.present();

            this.lista[0].completa = true;

            this.tareaService.edit(this.lista[0]).subscribe(
              (data) => {
                loading_lt_2.dismissAll();
                this.lista[0] = new TareaImp(data);
                toastCorrecto_lt_2.present();

              },
              (error) => {
              });


            console.log('Confirmó, la tarea ahora está completa');


          }
        }
      ]
    });
    alert.present();

  }





  tareaIncompleta(){
    let alert = this.alertCtrl.create({
      title: 'Cambiar el estado de la tarea',
      message: '¿Realmente quiere dar por incompleta esta tarea?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Canceló, no se ha cambiado nada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {



            //Tengo que actualizar
            let loading_lt_3 = this.loadingCtrl.create({
              content: 'Actualizando la tarea...'
            });
            let toastCorrecto_lt_3 = this.toastCtrl.create({
              message: 'Tarea actualizada correctamente!',
              duration: 3000,
              position: 'bottom'
            });



            loading_lt_3.present();

            this.lista[0].completa = false;

            this.tareaService.edit(this.lista[0]).subscribe(
              (data) => {
                loading_lt_3.dismissAll();
                this.lista[0] = new TareaImp(data);
                toastCorrecto_lt_3.present();

              },
              (error) => {
              });


            console.log('Confirmó, la tarea ahora está incompleta');

          }
        }
      ]
    });
    alert.present();

  }

  switchEstadoTarea() {
    console.log("entro al switch - completa");


    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";

    if(valido && (this.lista[0] == undefined || this.lista[0].verificada)){
      mensaje = 'La tarea ya fue completada';
      valido = false;
    }

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    if ( valido ) {

      if (this.lista[0].completa){
        this.tareaIncompleta();
      }
      else
      {
        this.completarTarea();
      }

    }


  }





















  tareaVerificada(){
    let alert = this.alertCtrl.create({
      title: 'Confirmar tarea Verificada',
      message: '¿Realmente quiere dar por verificada esta tarea?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Canceló, no se ha cambiado nada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {



            //Tengo que actualizar
            let loading_lt_2 = this.loadingCtrl.create({
              content: 'Actualizando la tarea...'
            });
            let toastCorrecto_lt_2 = this.toastCtrl.create({
              message: 'Tarea actualizada correctamente!',
              duration: 3000,
              position: 'bottom'
            });


            loading_lt_2.present();

            this.lista[0].verificada = true;

            this.tareaService.edit(this.lista[0]).subscribe(
              (data) => {
                loading_lt_2.dismissAll();
                this.lista[0] = new TareaImp(data);
                toastCorrecto_lt_2.present();

              },
              (error) => {
              });


            console.log('Confirmó, la tarea ahora está verificada');


          }
        }
      ]
    });
    alert.present();

  }





  tareaSinVerificar(){
    let alert = this.alertCtrl.create({
      title: 'Cambiar verificación de la tarea',
      message: '¿Realmente quiere asignar esta tarea como sin verificación?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Canceló, no se ha cambiado nada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {



            //Tengo que actualizar
            let loading_lt_3 = this.loadingCtrl.create({
              content: 'Actualizando la tarea...'
            });
            let toastCorrecto_lt_3 = this.toastCtrl.create({
              message: 'Tarea actualizada correctamente!',
              duration: 3000,
              position: 'bottom'
            });



            loading_lt_3.present();

            this.lista[0].verificada = false;

            this.tareaService.edit(this.lista[0]).subscribe(
              (data) => {
                loading_lt_3.dismissAll();
                this.lista[0] = new TareaImp(data);
                toastCorrecto_lt_3.present();

              },
              (error) => {
              });


            console.log('Confirmó, la tarea ahora está sin verificar');

          }
        }
      ]
    });
    alert.present();

  }







  switchVerificadaTarea() {
    console.log("entro al switch - Verificado");

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";

    if(valido && (this.lista[0] == undefined || !this.lista[0].completa)){
      mensaje = 'La tarea no está completa';
      valido = false;
    }

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    if ( valido ) {

      if (this.lista[0].verificada) {
        this.tareaSinVerificar();
      }
      else {
        this.tareaVerificada();
      }

    }
  }

}
