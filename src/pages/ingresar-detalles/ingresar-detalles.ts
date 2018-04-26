import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  Events, IonicPage, NavController, NavParams, ToastController
} from 'ionic-angular';
//import {ClienteServices} from "../../app/_services/cliente.services";
import {AltaDescripcionPage} from "../alta-descripcion/alta-descripcion";
import {DatePipe} from "@angular/common";
import { registerLocaleData } from '@angular/common';
import localeUy from '@angular/common/locales/es-UY';


/**
 * Generated class for the IngresarDetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ingresar-detalles',
  templateUrl: 'ingresar-detalles.html',
})
export class IngresarDetallesPage {

  lista: any[];
  comentarios: string;
  kmEquipoRecepcion: number;

  equipoDocumentos: boolean = false;
  equipoAbollones: boolean = false;
  rueda_auxiliar: string = 'no';
  equipoAuxiliar: boolean = false;
  equipoAuxiliarArmada: boolean = false;
  equipoBalizas: boolean = false;
  equipoCantidadCombustible: number = 0;
  equipoCenicero: boolean = false;
  equipoEspejos: boolean = false;
  equipoEspejosSanos: boolean = false;
  equipoExtintor: boolean = false;
  equipoFrenteRadio: boolean = false;
  equipoGatoPalanca: boolean = false;
  equipoHerramientas: boolean = false;
  equipoLlaveRuedas: boolean = false;
  equipoLucesTraserasSanas: boolean = false;
  equipoMangueraCabina: boolean = false;
  equipoManuales: boolean = false;
  equipoParabrisasSano: boolean = false;
  equipoRadio: boolean = false;
  equipoRayones: boolean = false;
  equipoSenalerosSanos: boolean = false;
  equipoVidriosLaterales: boolean = false;
  equipoVidriosLateralesSanos: boolean = false;
  dibujoEquipoRecepcion: string = '';
  fechaRecepcion: Date;
  fechaRecepcion_txt: string = '';
  fechaProvistaEntrega: Date;
  dp: DatePipe;

  @ViewChild('myInput') myInput: ElementRef;






  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              /*private as: AlertController,*/
              /*private toastCtrl: ToastController,*/
              private events: Events) {
    this.lista = [];
    registerLocaleData(localeUy);

    this.fechaRecepcion = new Date();
    this.fechaProvistaEntrega = new Date( );
    this.dp = new DatePipe('es-UY');
    this.fechaRecepcion_txt = this.dp.transform( this.fechaRecepcion, 'dd/MM/yyyy HH:MM');
    console.log("FPE: " + this.dp.transform( this.fechaProvistaEntrega, 'dd-MM-yyyy HH:mm'));
  }



  logicaRuedaAuxiliar() {
    console.log('rueda:'+this.rueda_auxiliar);

    if(this.rueda_auxiliar == 'no'){
      this.equipoAuxiliar = false;
      this.equipoAuxiliarArmada = false;
    } else if(this.rueda_auxiliar = 'armada'){
      this.equipoAuxiliar == true;
      this.equipoAuxiliarArmada = true;
    } else if(this.rueda_auxiliar = 'solo_disco'){
      this.equipoAuxiliar == true;
      this.equipoAuxiliarArmada = false;
    }
    console.log('aux:'+this.equipoAuxiliar);
    console.log('auxArm:'+this.equipoAuxiliarArmada);
  }


  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    console.log("comentarios: "+this.comentarios);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad IngresarDetallesPage');
  }


  confirmarDetalles(){

    //Tengo que generar la data para mandarla al padre


    this.events.publish('change-tab', 3, {
      'fechaRecepcion': this.dp.transform( this.fechaRecepcion, 'dd-MM-yyyy HH:MM'),
      'fechaProvistaEntrega': this.dp.transform( this.fechaProvistaEntrega, 'dd-MM-yyyy'),
      'comentarios': this.comentarios,
      'kmEquipoRecepcion': this.kmEquipoRecepcion,

      'equipoDocumentos': this.equipoDocumentos,
      'equipoAbollones': this.equipoAbollones,
      'rueda_auxiliar': this.rueda_auxiliar,
      'equipoAuxiliar': this.equipoAuxiliar,
      'equipoAuxiliarArmada': this.equipoAuxiliarArmada,
      'equipoBalizas': this.equipoBalizas,
      'equipoCantidadCombustible': this.equipoCantidadCombustible,
      'equipoCenicero': this.equipoCenicero,
      'equipoEspejos': this.equipoEspejos,
      'equipoEspejosSanos': this.equipoEspejosSanos,
      'equipoExtintor': this.equipoExtintor,
      'equipoFrenteRadio': this.equipoFrenteRadio,
      'equipoGatoPalanca': this.equipoGatoPalanca,
      'equipoHerramientas': this.equipoHerramientas,
      'equipoLlaveRuedas': this.equipoLlaveRuedas,
      'equipoLucesTraserasSanas': this.equipoLucesTraserasSanas,
      'equipoMangueraCabina': this.equipoMangueraCabina,
      'equipoManuales': this.equipoManuales,
      'equipoParabrisasSano': this.equipoParabrisasSano,
      'equipoRadio': this.equipoRadio,
      'equipoRayones': this.equipoRayones,
      'equipoSenalerosSanos': this.equipoSenalerosSanos,
      'equipoVidriosLaterales': this.equipoVidriosLaterales,
      'equipoVidriosLateralesSanos': this.equipoVidriosLateralesSanos,
      'dibujoEquipoRecepcion': this.dibujoEquipoRecepcion
    });
  }


  callbackDetalle = (_params) => {


    return new Promise((resolve, reject) => {
      console.log("VUELVO:: de Seteat foto");
      //console.log(this.firmaCliente64);
      //Cambio como dijo el tincho para poder pushear las fotos

      /**/


      this.lista.push(_params);
      this.events.publish('push-foto', _params);
      //console.log(this.firmaCliente64);
      resolve();
    });
  };


  nuevoDetalle() {

    this.navCtrl.push(AltaDescripcionPage, {callback: this.callbackDetalle})

  }

}
