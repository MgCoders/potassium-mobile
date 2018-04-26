import {Component, ViewChild} from '@angular/core';
import {
  Events, IonicPage, Keyboard, NavController, NavParams, Platform, Tabs,
  ToastController
} from 'ionic-angular';
import {IngresarDetallesPage} from "../ingresar-detalles/ingresar-detalles";
import {IngresarFirmaPage} from "../ingresar-firma/ingresar-firma";
import {ListaEquipoPage} from "../lista-equipo/lista-equipo";
import {ListaClientePage} from "../lista-cliente/lista-cliente";
import {Trabajo} from "../../app/_models/Trabajo";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {TrabajoImp} from "../../app/_models/TrabajoImp";
import {EquipoImp} from "../../app/_models/EquipoImp";
import {TrabajoService} from "../../app/_services/trabajo.service";
import {DatePipe, registerLocaleData} from "@angular/common";
import localeUy from "@angular/common/locales/es-UY";
import {TrabajoFotoService} from "../../app/_services/trabajoFoto.service";
import {TrabajoFotoImp} from "../../app/_models/TrabajoFotoImp";
import {TrabajoFoto} from "../../app/_models/TrabajoFoto";

/**
 * Generated class for the AltaTrabajoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-trabajo',
  templateUrl: 'alta-trabajo.html',
})
export class AltaTrabajoPage {

  @ViewChild(Tabs) tabs: Tabs;

  tipoTrabajo: string;

  tabCliente:any;
  tabEquipo:any;
  tabDetalles:any;
  tabFirma:any;

  listaFotos: TrabajoFoto[] = [];

  enabled_tabCliente: boolean;
  enabled_tabEquipo: boolean;
  enabled_tabDetalles: boolean;
  enabled_tabFrima: boolean;

  trabajoActual: Trabajo;
  dp: DatePipe;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public keyboard: Keyboard,
              public events: Events,
              private trabajoFotoService: TrabajoFotoService,
              private toastCtrl: ToastController,
              private trabajoService: TrabajoService) {

    registerLocaleData(localeUy);
    this.dp = new DatePipe('es-UY');

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

    let toastCorrectoFoto = this.toastCtrl.create({
      message: 'Foto cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastErrorFoto = this.toastCtrl.create({
      message: 'Error al cargar la foto..',
      duration: 3000,
      position: 'bottom'
    });

    this.limpiarCampos();


    //declaro el listener en las tabs

    events.subscribe('change-tab', (tab, data) => {
      console.log('EVENT::ChangeTAB');

      //Las tabs van de [0,1,....]
      if(tab==1 /*&& this.trabajoActual.cliente.id == undefined*/){
        //Voy a la vista de equipo, y acaban de seleccionar al cliente;
        this.enabled_tabCliente = false;
        this.enabled_tabEquipo = true;
        console.log('TAB:: selecciona cliente');
        //this.navParams.data=data;
        this.trabajoActual.cliente = data;
        console.log(this.trabajoActual.cliente);


      } else if(tab==2){
        //Voy a la vista de detalles, y acaban de seleccionar el equipo
        console.log('TAB:: selecciona equipo');
        this.enabled_tabEquipo = false;
        this.enabled_tabDetalles = true;
        this.trabajoActual.equipo = data;
        console.log(this.trabajoActual.equipo);

        //Cambio como dijo el tincho para poder pushear las fotos
        this.trabajoService.create(this.trabajoActual).subscribe(
          (data) => {
            toastCorrecto.present();
            this.trabajoActual = new TrabajoImp(data);
          },
          (error) => {
            console.log(error);
            toastError.setMessage(error);
            toastError.present();
          });
      }

      else if(tab==3){
        //Voy a la vista de firmas, y acaban de ingresar los detalles
        console.log('TAB:: Ingresa Detalles');
        this.enabled_tabDetalles = false;
        this.enabled_tabFrima = true;

        console.log("Data: ");
        console.log(data);

        //Obtengo la lista de detalles para agregarle al trabajo actual
        this.trabajoActual.comentarios = data['comentarios'];
        this.trabajoActual.fechaRecepcion= data['fechaRecepcion'];
        this.trabajoActual.fechaProvistaEntrega = data['fechaProvistaEntrega'];
        this.trabajoActual.kmEquipoRecepcion = data['kmEquipoRecepcion'];
        this.trabajoActual.equipoDocumentos = data['equipoDocumentos'];
        this.trabajoActual.equipoAbollones = data['equipoAbollones'];
        this.trabajoActual.equipoAuxiliar = data['equipoAuxiliar'];
        this.trabajoActual.equipoAuxiliarArmada = data['equipoAuxiliarArmada'];
        this.trabajoActual.equipoBalizas = data['equipoBalizas'];
        this.trabajoActual.equipoCantidadCombustible = data['equipoCantidadCombustible'];
        this.trabajoActual.equipoCenicero = data['equipoCenicero'];
        this.trabajoActual.equipoEspejos = data['equipoEspejos'];
        this.trabajoActual.equipoEspejosSanos = data['equipoEspejosSanos'];
        this.trabajoActual.equipoExtintor = data['equipoExtintor'];
        this.trabajoActual.equipoFrenteRadio = data['equipoFrenteRadio'];
        this.trabajoActual.equipoGatoPalanca = data['equipoGatoPalanca'];
        this.trabajoActual.equipoHerramientas = data['equipoHerramientas'];
        this.trabajoActual.equipoLlaveRuedas = data['equipoLlaveRuedas'];
        this.trabajoActual.equipoLucesTraserasSanas = data['equipoLucesTraserasSanas'];
        this.trabajoActual.equipoMangueraCabina = data['equipoMangueraCabina'];
        this.trabajoActual.equipoManuales = data['equipoManuales'];
        this.trabajoActual.equipoParabrisasSano = data['equipoParabrisasSano'];
        this.trabajoActual.equipoRadio = data['equipoRadio'];
        this.trabajoActual.equipoRayones = data['equipoRayones'];
        this.trabajoActual.equipoSenalerosSanos = data['equipoSenalerosSanos'];
        this.trabajoActual.equipoVidriosLaterales = data['equipoVidriosLaterales'];
        this.trabajoActual.equipoVidriosLateralesSanos = data['equipoVidriosLateralesSanos'];
        this.trabajoActual.dibujoEquipoRecepcion = data['dibujoEquipoRecepcion'];


        if (this.trabajoActual.equipoDocumentos) {
          console.log("tiene documentos");
        } else {
          console.log("no tiene");
        }

      }
      else if(tab==4){
        //Me llegó la firma en la data!
        console.log('TAB:: Ingresa Firma');
        console.log("Data: ");
        console.log(data);

        this.trabajoActual.firmaClienteRecepcion = data['firmaClienteRecepcion'];
        this.trabajoActual.firmaEmpleadoRecepcion = data['firmaEmpleadoRecepcion'];
        this.trabajoActual.nombreClienteRecepcion = data['nombreClienteRecepcion'];
        this.trabajoActual.nombreEmpleadoRecepcion = data['nombreEmpleadoRecepcion'];

        //Pushear el trabajo a la API
        console.log('Imprimo el trabajo');
        console.log(this.trabajoActual);

        /*
        Cambio como dijo el tincho para poder pushear las fotos
        Ahora hago un update
        */
        this.trabajoService.edit(this.trabajoActual).subscribe(
          (data) => {
            toastCorrecto.present();
            this.trabajoActual = new TrabajoImp(data);
          },
          (error) => {
            console.log(error);
            toastError.setMessage(error);
            toastError.present();
          });


        events.unsubscribe('change-tab');
        this.limpiarCampos();

        this.navCtrl.pop();
        return;
      }

      console.log(this.trabajoActual);

      //console.log('entro>');
      this.tabs.select(tab, {});
      //console.log('<salgo');

    });

    events.subscribe('push-foto', (data) => {
      console.log("Entró a la función padre!")
      //console.log("trabajo", this.trabajoActual);
      //console.log("params:", data);
      let trabFot = new TrabajoFotoImp({foto: data['img'], trabajo: this.trabajoActual, descripcion: data['descr']});

      console.log("trabFot:", trabFot);
      this.trabajoFotoService.create(trabFot).subscribe(
        (data) => {
          toastCorrectoFoto.present();
          this.listaFotos.push(new TrabajoFotoImp(data));
        },
        (error) => {
          console.log(error);
          toastErrorFoto.setMessage(error);
          toastErrorFoto.present();
        });

      return;
    });
  }

  keyboardCheck() {
    //console.log('The keyboard is open:', this.keyboard.isOpen());
    return this.keyboard.isOpen();
  }


  limpiarCampos(){
    this.tabCliente = ListaClientePage;
    this.tabEquipo = ListaEquipoPage;
    this.tabDetalles = IngresarDetallesPage;
    this.tabFirma = IngresarFirmaPage;
    this.tipoTrabajo = this.navParams.get('tipo');

    this.enabled_tabCliente = true;
    this.enabled_tabDetalles = false;
    this.enabled_tabEquipo = false;
    this.enabled_tabFrima = false;

    //Inicializo un trabajo en vacio
    let c = new ClienteImp({nombreEmpresa:'',personaContacto:'',telefonoContacto:''});
    let e = new EquipoImp({marca:'',modelo:'',matricula:'',color:''});
    this.trabajoActual =
      new TrabajoImp({
        cliente:c,
        equipo:e,
        motivoVisita: this.tipoTrabajo,
        fechaRecepcion: this.dp.transform( new Date(), 'dd-MM-yyyy HH:MM'),
        fechaProvistaEntrega: this.dp.transform( new Date(), 'dd-MM-yyyy'),
        requierePresupuesto:false,
        comentarios:'',
        estado:'',
        kmEquipoRecepcion:0,
        firmaClienteRecepcion: '',
        firmaEmpleadoRecepcion: '',
        nombreClienteRecepcion:'',
        nombreEmpleadoRecepcion:'',
        nroFactura:0,
        nroRemito:0,
        nroOrdenCompra:0,
        equipoDocumentos:false,
        equipoAbollones:false,
        equipoAuxiliar:false,
        equipoAuxiliarArmada:false,
        equipoBalizas:false,
        equipoCantidadCombustible:0,
        equipoCenicero:false,
        equipoEspejos:false,
        equipoEspejosSanos:false,
        equipoExtintor:false,
        equipoFrenteRadio:false,
        equipoGatoPalanca:false,
        equipoHerramientas:false,
        equipoLlaveRuedas:false,
        equipoLucesTraserasSanas:false,
        equipoMangueraCabina:false,
        equipoManuales:false,
        equipoParabrisasSano:false,
        equipoRadio:false,
        equipoRayones:false,
        equipoSenalerosSanos:false,
        equipoVidriosLaterales:false,
        equipoVidriosLateralesSanos:false,
        dibujoEquipoRecepcion: ''}
      );
    console.log('Todo Limpito');
    console.log(this.trabajoActual);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaTrabajoPage');

    console.log(this.tipoTrabajo);

  }

  ionViewWillLeave(){
    // Si apreta la flechita de arriba, se unsuscribe
    this.events.unsubscribe('change-tab');
  }

}
