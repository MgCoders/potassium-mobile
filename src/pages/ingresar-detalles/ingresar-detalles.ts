import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  Events, IonicPage, NavController, NavParams, ToastController
} from 'ionic-angular';
import {AltaDescripcionPage} from "../alta-descripcion/alta-descripcion";
import {DatePipe} from "@angular/common";
import { registerLocaleData } from '@angular/common';
import localeUy from '@angular/common/locales/es-UY';
import moment from 'moment';
import {Trabajo} from "../../app/_models/Trabajo";
import {AltaDibujoPage} from "../alta-dibujo/alta-dibujo";
import {TrabajoFotoService} from "../../app/_services/trabajoFoto.service";
import {TrabajoFotoImp} from "../../app/_models/TrabajoFotoImp";


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
  dibujoAncho: number = 0;
  dibujoAlto: number = 0;
  fechaRecepcion: Date;
  fechaRecepcion_txt: string = '';
  fechaProvistaEntrega: Date;

  trabajoActual: Trabajo;
  background:string;

  today: string;
  max: string;
  dp: DatePipe;

  @ViewChild('myInput') myInput: ElementRef;






  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private trabajoFotoService: TrabajoFotoService,
              /*private as: AlertController,*/
              private toastCtrl: ToastController,
              private events: Events) {

    //seteo el fondo segun el tipo equipo!
    this.background = '../../assets/imgs/auto.png';


    let toastError = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });


    this.lista = [];


    events.subscribe('actualizar-trabajo', (data) => {
      console.log('evento:: Actualizar trabajo')
      let id = data['id'];
      if (id != undefined){
        this.trabajoActual = data;
        console.log('actualizo trabajo con la vista:',this.trabajoActual);
        if(id != undefined){
          console.log('Descargo las fotos del trabajo (si tiene)!');
          this.trabajoFotoService.get(id).subscribe(
            (data) => {
              data.forEach( item => {
                this.lista.push( new TrabajoFotoImp(item));
                console.log('Foto en el server!:', item);
              });

              console.log("adentro",this.trabajoActual);
            },
            (error) => {
              toastError.setMessage(error.toString());
            }
          );
        }
      }
    });

    this.trabajoActual = this.navParams.data['trabajoActual'];
    console.log('Trabajo seleccionado (carga vista):',this.trabajoActual);



    registerLocaleData(localeUy);
    this.dp = new DatePipe('es-UY');

    let tipo = this.navParams.data['tipo'];


    this.fechaRecepcion = new Date();
    this.fechaProvistaEntrega = new Date();

    if(tipo == "recuperar"){
      //this.fechaRecepcion = new Date(this.dp.transform( this.trabajoActual.fechaRecepcion, 'dd/MM/yyyy HH:MM'));
      //this.fechaProvistaEntrega = new Date(this.dp.transform( this.trabajoActual.fechaProvistaEntrega, 'dd/MM/yyyy HH:MM'));
      //Viene así -> 28-05-2018 necesitamos agregarle la hora
      //console.log( "1" );
      var fechaR = this.trabajoActual.fechaRecepcion.substr(0, 10);
      var fechaRStr = fechaR.split("-");
      //console.log("fechaparseada: "+Number(fechaStr[0]), Number(fechaStr[1]) , Number(fechaStr[2]));
      this.fechaRecepcion = new Date( Number(fechaRStr[2]) , Number(fechaRStr[1])-1 , Number(fechaRStr[0]) );

      //console.log( "2" );
      var fechaP = this.trabajoActual.fechaProvistaEntrega.substr(0, 10);
      var fechaPStr = fechaP.split("-");
      this.fechaProvistaEntrega = new Date( Number(fechaPStr[2]) , Number(fechaPStr[1])-1 , Number(fechaPStr[0]) );

      //console.log( "3" );
      //Datos
      this.comentarios =          (this.trabajoActual.comentarios == undefined ? '' : this.trabajoActual.comentarios);
      this.kmEquipoRecepcion =    (this.trabajoActual.kmEquipoRecepcion);
      this.equipoDocumentos =     (this.trabajoActual.equipoDocumentos == undefined ? false : this.trabajoActual.equipoDocumentos);
      this.equipoAbollones =      (this.trabajoActual.equipoAbollones == undefined ? false : this.trabajoActual.equipoAbollones);
      this.equipoAuxiliar =       (this.trabajoActual.equipoAuxiliar == undefined ? false : this.trabajoActual.equipoAuxiliar);
      this.equipoAuxiliarArmada = (this.trabajoActual.equipoAuxiliarArmada == undefined ? false : this.trabajoActual.equipoAuxiliarArmada);
      this.equipoBalizas =        (this.trabajoActual.equipoBalizas == undefined ? false : this.trabajoActual.equipoBalizas);
      this.equipoCantidadCombustible = (this.trabajoActual.equipoCantidadCombustible);
      this.equipoCenicero =       (this.trabajoActual.equipoCenicero == undefined ? false : this.trabajoActual.equipoCenicero);
      this.equipoEspejos =        (this.trabajoActual.equipoEspejos == undefined ? false : this.trabajoActual.equipoEspejos);
      this.equipoEspejosSanos =   (this.trabajoActual.equipoEspejosSanos == undefined ? false : this.trabajoActual.equipoEspejosSanos);
      this.equipoExtintor =       (this.trabajoActual.equipoExtintor == undefined ? false : this.trabajoActual.equipoExtintor);
      this.equipoFrenteRadio =    (this.trabajoActual.equipoFrenteRadio == undefined ? false : this.trabajoActual.equipoFrenteRadio);
      this.equipoGatoPalanca =    (this.trabajoActual.equipoGatoPalanca == undefined ? false : this.trabajoActual.equipoGatoPalanca);
      this.equipoHerramientas =   (this.trabajoActual.equipoHerramientas == undefined ? false : this.trabajoActual.equipoHerramientas);
      this.equipoLlaveRuedas =    (this.trabajoActual.equipoLlaveRuedas == undefined ? false : this.trabajoActual.equipoLlaveRuedas);
      this.equipoLucesTraserasSanas = (this.trabajoActual.equipoLucesTraserasSanas == undefined ? false : this.trabajoActual.equipoLucesTraserasSanas);
      this.equipoMangueraCabina = (this.trabajoActual.equipoMangueraCabina == undefined ? false : this.trabajoActual.equipoMangueraCabina);
      this.equipoManuales =       (this.trabajoActual.equipoManuales == undefined ? false : this.trabajoActual.equipoManuales);
      this.equipoParabrisasSano = (this.trabajoActual.equipoParabrisasSano == undefined ? false : this.trabajoActual.equipoParabrisasSano);
      this.equipoRadio =          (this.trabajoActual.equipoRadio == undefined ? false : this.trabajoActual.equipoRadio);
      this.equipoRayones =        (this.trabajoActual.equipoRayones == undefined ? false : this.trabajoActual.equipoRayones);
      this.equipoSenalerosSanos = (this.trabajoActual.equipoSenalerosSanos == undefined ? false : this.trabajoActual.equipoSenalerosSanos);
      this.equipoVidriosLaterales = (this.trabajoActual.equipoVidriosLaterales == undefined ? false : this.trabajoActual.equipoVidriosLaterales);
      this.equipoVidriosLateralesSanos = (this.trabajoActual.equipoVidriosLateralesSanos == undefined ? false : this.trabajoActual.equipoVidriosLateralesSanos);
      this.dibujoEquipoRecepcion = (this.trabajoActual.dibujoEquipoRecepcion == undefined ? '' : this.trabajoActual.dibujoEquipoRecepcion);


    }


    this.fechaRecepcion_txt = this.dp.transform( this.fechaRecepcion, 'dd/MM/yyyy HH:MM');

    this.today = new Date().toJSON().split('T')[0];
    this.max = moment().add(2, 'years').toJSON().split('T')[0];

    console.log("FPE: " + this.dp.transform( this.fechaProvistaEntrega, 'dd-MM-yyyy HH:mm'));
    console.log("today: ",this.today);
    console.log("max: ",this.max);
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

    this.trabajoActual.fechaRecepcion =       this.dp.transform( this.fechaRecepcion, 'dd-MM-yyyy HH:MM');
    this.trabajoActual.fechaProvistaEntrega = this.dp.transform( this.fechaProvistaEntrega, 'dd-MM-yyyy');
    this.trabajoActual.comentarios =          this.comentarios;
    this.trabajoActual.kmEquipoRecepcion =    this.kmEquipoRecepcion;
    this.trabajoActual.equipoDocumentos =     this.equipoDocumentos;
    this.trabajoActual.equipoAbollones =      this.equipoAbollones;
    this.trabajoActual.equipoAuxiliar =       this.equipoAuxiliar;
    this.trabajoActual.equipoAuxiliarArmada = this.equipoAuxiliarArmada;
    this.trabajoActual.equipoBalizas =        this.equipoBalizas;
    this.trabajoActual.equipoCantidadCombustible = this.equipoCantidadCombustible;
    this.trabajoActual.equipoCenicero =       this.equipoCenicero;
    this.trabajoActual.equipoEspejos =        this.equipoEspejos;
    this.trabajoActual.equipoEspejosSanos =   this.equipoEspejosSanos;
    this.trabajoActual.equipoExtintor =       this.equipoExtintor;
    this.trabajoActual.equipoFrenteRadio =    this.equipoFrenteRadio;
    this.trabajoActual.equipoGatoPalanca =    this.equipoGatoPalanca;
    this.trabajoActual.equipoHerramientas =   this.equipoHerramientas;
    this.trabajoActual.equipoLlaveRuedas =    this.equipoLlaveRuedas;
    this.trabajoActual.equipoLucesTraserasSanas = this.equipoLucesTraserasSanas;
    this.trabajoActual.equipoMangueraCabina = this.equipoMangueraCabina;
    this.trabajoActual.equipoManuales =       this.equipoManuales;
    this.trabajoActual.equipoParabrisasSano = this.equipoParabrisasSano;
    this.trabajoActual.equipoRadio =          this.equipoRadio;
    this.trabajoActual.equipoRayones =        this.equipoRayones;
    this.trabajoActual.equipoSenalerosSanos = this.equipoSenalerosSanos;
    this.trabajoActual.equipoVidriosLaterales = this.equipoVidriosLaterales;
    this.trabajoActual.equipoVidriosLateralesSanos = this.equipoVidriosLateralesSanos;
    this.trabajoActual.dibujoEquipoRecepcion = this.dibujoEquipoRecepcion;

    this.events.publish('change-tab', 3, this.trabajoActual);



    /*this.events.publish('change-tab', 3, {
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
    });*/
  }


  callbackDetalle = (_params) => {


    return new Promise((resolve, reject) => {
      console.log("VUELVO:: de Setear foto");
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

  callbackDibujo = (_params) => {


    return new Promise((resolve, reject) => {
      console.log("VUELVO:: de Setear el dibujo");
      console.log('params', _params);

      this.dibujoEquipoRecepcion = _params['dibujo'];
      this.dibujoAncho = _params['dibujoAncho'];
      this.dibujoAlto = _params['dibujoAlto'];

      //this.events.publish('push-foto', _params);
      //console.log(this.firmaCliente64);
      resolve();
    });
  };


  nuevoDibujo() {

    this.navCtrl.push(AltaDibujoPage, {callback: this.callbackDibujo,
                                                dibujo: this.dibujoEquipoRecepcion,
                                                dibujoAncho: this.trabajoActual.dibujoAncho,
                                                dibujoAlto: this.trabajoActual.dibujoAlto})

  }

}
