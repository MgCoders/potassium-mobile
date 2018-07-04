import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, Events} from 'ionic-angular';
import {AltaClientePage} from "../alta-cliente/alta-cliente";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {Cliente} from "../../app/_models/Cliente";
import {ClienteServices} from "../../app/_services/cliente.services";
import { ToastController } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import {Trabajo} from "../../app/_models/Trabajo";


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


  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  public enableFilter: boolean;

  public seleccionado: number = -1;

  public trabajoActual: Trabajo;
  public recuperarTrabajo: number = -1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private service: ClienteServices,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {

    this.recuperarTrabajo = this.navParams.data['recuperarTrabajo'];


    this.filterText = '';

    this.trabajoActual = this.navParams.data['trabajoActual'];
    console.log('Trabajo seleccionado:',this.trabajoActual);
    this.seleccionado =  this.trabajoActual.cliente.id;
    console.log('id del cliente seleccionado:',this.seleccionado);

    events.subscribe('client-selected', (data) => {
      this.seleccionado =  data;
      console.log('entré al evento, seleccionado:', this.seleccionado);
    });
  }

  isSelectedCliente(id: number){
    return id == this.seleccionado;
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

  ionViewDidLoad(){
    //this.filterText = "";
  }

  getListaClientes(){
    return this.lista;
  }

  ionViewWillEnter() {

    this.enableFilter = true;
    this.filterText = 'all';
    this.filterPlaceholder = "Busca por: empresa, mail, teléfono, rut, persona de contacto..";

    this.filterInput
      .valueChanges
      //.debounceTime(200)
      .subscribe(term => {
        this.filterText = term;
        console.log(term);
      });

    //Limpio la lista
    this.lista = [];
    console.log("Entro a la lista de clientes");

    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_lc = this.loadingCtrl.create({
      content: 'Cargando la lista de clientes...'
    });
    let toastCorrecto_lc = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_lc = this.toastCtrl.create({
      message: 'Error al obtener la lista de clientes..',
      duration: 3000,
      position: 'bottom'
    });


    loading_lc.present();
    this.service.getAll().subscribe(

      (data) => {
        loading_lc.dismissAll();

        //Obtengo la lista desde el server con lo último
        data.forEach(Cliente => {
          this.lista.push( new ClienteImp(Cliente));
        });

        console.log("lista de clientes:",this.lista);
        toastCorrecto_lc.present();
      },
      (error) => {
        loading_lc.dismissAll();
        toastError_lc.setMessage(error);
        toastError_lc.present();
    });
    this.lista = [];
  }

  esRecuperacion() {
    console.log("BOOL:: es recuperación?", this.seleccionado != -1);
    console.log("BOOL:: seleccionado", this.seleccionado);
    return this.seleccionado != undefined && this.seleccionado != -1;


  }

}
