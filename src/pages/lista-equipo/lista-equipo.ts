import {Component} from '@angular/core';
import {
  Events, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {Equipo} from "../../app/_models/Equipo";
import {EquipoServices} from "../../app/_services/equipo.service";
import {AltaEquipoPage} from "../alta-equipo/alta-equipo";
import {EquipoImp} from "../../app/_models/EquipoImp";
import {Cliente} from "../../app/_models/Cliente";
import {FormControl} from "@angular/forms";
import {Trabajo} from "../../app/_models/Trabajo";

/**
 * Generated class for the ListaEquipoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-equipo',
  templateUrl: 'lista-equipo.html',
})
export class ListaEquipoPage {

  lista: Equipo[];
  clienteSeleccionado: Cliente;

  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  public enableFilter: boolean;
  public trabajoActual: Trabajo;
  public seleccionado: number = -1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              //private as: AlertController,
              private service: EquipoServices,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {

    this.trabajoActual = this.navParams.data['trabajoActual'];
    this.clienteSeleccionado = this.trabajoActual.cliente;
    this.seleccionado = this.trabajoActual.equipo.id;
    console.log('Cliente - Seleccionado(Data): ', this.clienteSeleccionado);

    this.filterText = '';

    events.subscribe('equip-selected', (data) => {
      this.seleccionado = data;
      console.log('entré al evento, seleccionado:', this.seleccionado);
    });

  }

  getListaEquipos() {
    return this.lista;
  }

  isSelectedEquipo(id: number) {
    return id == this.seleccionado;
  }

  nuevoEquipo() {
    this.navCtrl.push(AltaEquipoPage, {cliente: this.trabajoActual.cliente});
  }

  editarEquipo(id: number) {
    this.navCtrl.push(AltaEquipoPage, {id: id, cliente: this.trabajoActual.cliente});
  }

  seleccionarEquipo(id: number) {
    console.log('LISTA:: equipo seleccionado');
    console.log(id);

    this.events.publish('change-tab', 2, this.lista.find((x) => x.id === id));
    1
    //this.navCtrl.push(AltaEquipoPage, );
  }


  ionViewWillEnter() {

    this.enableFilter = true;
    this.filterText = 'all';
    this.filterPlaceholder = "Busca por: marca, matrícula, modelo, color..";

    this.filterInput
      .valueChanges
      //.debounceTime(200)
      .subscribe(term => {
        this.filterText = term;
        console.log(term);
      });

    //Limpio la lista
    this.lista = [];
    console.log("Entro a la lista de equipos");

    //console.log('ionViewDidLoad SeleccionaEquipoPage');
    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_le = this.loadingCtrl.create({
      content: 'Cargando la lista de equipos...'
    });
    let toastCorrecto_le = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_le = this.toastCtrl.create({
      message: 'Error al obtener la lista de equipos..',
      duration: 3000,
      position: 'bottom'
    });


    loading_le.present();
    this.service.getByCliente(this.clienteSeleccionado.id).subscribe(

      (data) => {
        loading_le.dismissAll();

        //Obtengo la lista desde el server con lo último
        data.forEach (Equipo => {
          this.lista.push(new EquipoImp(Equipo));
        });

        console.log("equipos del cliente:",this.lista);
        toastCorrecto_le.present();
      },
      (error) => {
        loading_le.dismissAll();
        toastError_le.setMessage(error.toString());
        toastError_le.present();
      });
  }

}
