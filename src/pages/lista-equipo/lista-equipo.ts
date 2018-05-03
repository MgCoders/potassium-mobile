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

    this.clienteSeleccionado = this.navParams.data['cliente'];
    this.trabajoActual = this.navParams.data['trabajoActual'];
    this.seleccionado = this.trabajoActual.equipo.id;
    console.log('Cliente - Seleccionado(Data): ', this.clienteSeleccionado);

    this.filterText = 'all';

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
    this.navCtrl.push(AltaEquipoPage, {cliente: this.navParams.data});
  }

  editarEquipo(id: number) {
    this.navCtrl.push(AltaEquipoPage, {id: id, cliente: this.navParams.data});
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
    console.log("Entro a la lista de clientes");


    //console.log('ionViewDidLoad SeleccionaEquipoPage');
    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading = this.loadingCtrl.create({
      content: 'Cargando la lista de equipos...'
    });
    let toastCorrecto = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError = this.toastCtrl.create({
      message: 'Error al obtener la lista de equipos..',
      duration: 3000,
      position: 'bottom'
    });


    loading.present();
    this.service.getByCliente(1).subscribe(
      (data) => {
        loading.dismissAll();

        //Obtengo la lista desde el server con lo último
        data.forEach (Equipo => {
          this.lista.push(new EquipoImp(Equipo));
        })

        this.lista.sort(function (a, b) {
          return a.id - b.id;
        });
        console.log(this.lista);
        toastCorrecto.present();
      },
      (error) => {
        loading.dismissAll();
        toastError.setMessage(error.toString());
        toastError.present();
      });
  }

}
