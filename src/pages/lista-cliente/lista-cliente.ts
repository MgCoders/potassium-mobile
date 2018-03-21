import { Component } from '@angular/core';
import {IonicPage, NavController, Loading, NavParams, LoadingController, AlertController, Events} from 'ionic-angular';
import {AltaClientePage} from "../alta-cliente/alta-cliente";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {Cliente} from "../../app/_models/Cliente";
import {ClienteServices} from "../../app/_services/cliente.services";
import { ToastController } from 'ionic-angular';
import {errorHandler} from "@angular/platform-browser/src/browser";


/**
 * Generated class for the ListaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-cliente',
  templateUrl: 'lista-cliente.html',
})
export class ListaClientePage {

  lista: Cliente[];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private as: AlertController,
              private service: ClienteServices,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {
  }

  nuevoCliente() {
    this.navCtrl.push(AltaClientePage, {});
  }

  editarCliente(id: number) {
    this.navCtrl.push(AltaClientePage, {id:id});
  }

  seleccionarCliente(id: number ) {
    console.log('LISTA:: cliente seleccionado');
    //console.log(id);

    this.events.publish('change-tab', 1, this.lista.find((x) => x.id === id));
    //this.navCtrl.push(AltaClientePage, );
  }

  ionViewWillEnter() {

    //Limpio la lista
    this.lista = [];
    console.log("Entro a la lista de clientes");


    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading = this.loadingCtrl.create({
      content: 'Cargando la lista de clientes...'
    });
    let toastCorrecto = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError = this.toastCtrl.create({
      message: 'Error al obtener la lista de clientes..',
      duration: 3000,
      position: 'bottom'
    });



    loading.present();
    this.service.getAll().subscribe(

      (data) => {
        loading.dismissAll();

        //Obtengo la lista desde el server con lo último
        data.forEach(Cliente => {this.lista.push( new ClienteImp(Cliente));} )

        this.lista.sort(function(a, b) {
          return a.id - b.id;
        });
        console.log(this.lista);
        toastCorrecto.present();
      },
      (error) => {
        loading.dismissAll();
        toastError.setMessage(error);
        toastError.present();
    });


  }

}
