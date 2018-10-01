import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, Events} from 'ionic-angular';
import {AltaClientePage} from "../alta-cliente/alta-cliente";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {Cliente} from "../../app/_models/Cliente";
import {ClienteServices} from "../../app/_services/cliente.services";
import { ToastController } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import {Trabajo} from "../../app/_models/Trabajo";
import {Material} from "../../app/_models/Material";
import {MaterialService} from "../../app/_services/material.service";
import {MaterialImp} from "../../app/_models/MaterialImp";
import {TareaMaterial} from "../../app/_models/TareaMaterial";
import {TareaMaterialImp} from "../../app/_models/TareaMaterialImp";
import {TareaService} from "../../app/_services/tarea.service";
import {AltaTareaMaterialPage} from "../alta-tareamaterial/alta-tareamaterial";

/**
 * Generated class for the ListaMaterialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-material',
  templateUrl: 'lista-material.html',

})





export class ListaMaterialPage {

  lista: TareaMaterial[];
  trabajoActual: Trabajo;


  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  public enableFilter: boolean;

  public seleccionado: number = -1;

  public idTareaSeleccionada: number;
  public recuperarTrabajo: number = -1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private materialService: MaterialService,
              private tareaService: TareaService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {


    this.filterText = '';

    this.idTareaSeleccionada = this.navParams.data['idTareaSeleccionada'];
    this.trabajoActual = this.navParams.data['trabajoActual'];
    console.log('idTareaSeleccionada:',this.idTareaSeleccionada);

  }


  nuevaTareaMaterial() {
    this.navCtrl.push(AltaTareaMaterialPage, {trabajoActual: this.trabajoActual, idTareaSel: this.idTareaSeleccionada});
  }

  /*editarTareaMaterial(tm: TareaMaterial) {
    this.navCtrl.push(AltaTareaMaterialPage, {tareaMaterial:tm, trabajoActual: this.trabajoActual, idTareaSeleccionada: this.idTareaSeleccionada});
  }*/

  seleccionaTareaMaterial(tm: TareaMaterial) {
    this.navCtrl.push(AltaTareaMaterialPage, {tareaMaterial:tm, trabajoActual: this.trabajoActual, idTareaSel: this.idTareaSeleccionada});
  }

  getListaTareaMaterial(){
    return this.lista;
  }

  ionViewWillEnter() {

    this.enableFilter = true;
    this.filterText = 'all';
    this.filterPlaceholder = "Busca por Nombre del material..";

    this.filterInput
      .valueChanges
      //.debounceTime(200)
      .subscribe(term => {
        this.filterText = term;
        console.log(term);
      });

    //Limpio la lista
    this.lista = [];

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
    this.tareaService.getAllMaterialesByTarea(this.idTareaSeleccionada).subscribe(

      (data) => {
        loading_lc.dismissAll();

        //Obtengo la lista desde el server con lo último
        data.forEach(Material => {
          this.lista.push( new TareaMaterialImp(Material));
        });

        console.log("lista de materiales:",this.lista);
        toastCorrecto_lc.present();
      },
      (error) => {
        loading_lc.dismissAll();
        toastError_lc.setMessage(error);
        toastError_lc.present();
    });
    this.lista = [];
  }

}
