import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {IngresarDetallesPage} from "../ingresar-detalles/ingresar-detalles";
import {IngresarFirmaPage} from "../ingresar-firma/ingresar-firma";
import {ListaEquipoPage} from "../lista-equipo/lista-equipo";
import {ListaClientePage} from "../lista-cliente/lista-cliente";
import {Trabajo} from "../../app/_models/Trabajo";
import {ClienteServices} from "../../app/_services/cliente.services";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {TrabajoImp} from "../../app/_models/TrabajoImp";
import {EquipoImp} from "../../app/_models/EquipoImp";

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

  enabled_tabCliente: boolean;
  enabled_tabEquipo: boolean;
  enabled_tabDetalles: boolean;
  enabled_tabFrima: boolean;

  trabajoActual: Trabajo;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private clienteServices: ClienteServices,
              public events: Events) {

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
        this.navParams.data=data;
        this.trabajoActual.cliente = data;
        console.log(this.trabajoActual.cliente);


      } else if(tab==2){
        //Voy a la vista de detalles, y acaban de seleccionar el equipo
        console.log('TAB:: selecciona equipo');
        this.enabled_tabEquipo = false;
        this.enabled_tabDetalles = true;
        this.trabajoActual.equipo = data;
        console.log(this.trabajoActual.equipo);


      }
      else if(tab==3){
        //Voy a la vista de detalles, y acaban de seleccionar el equipo
        console.log('TAB:: Ingresa Detalles');
        this.enabled_tabDetalles = false;
        this.enabled_tabFrima = true;
        //this.trabajoActual.comentarios = "";
        console.log(this.trabajoActual.comentarios);
      }
      else if(tab==4){
        events.unsubscribe('change-tab');
        this.limpiarCampos();
      }

      console.log('entro>');
      this.tabs.select(tab);
      console.log('<salgo');

      console.log(this.trabajoActual);
    });
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
        motivoVisita:'',
        fechaRecepcion:'',
        fechaProvistaEntrega:'',
        requierePresupuesto:false,
        comentarios:'',
        estado:'',
        kmEquipoRecepcion:0,
        nombreClienteRecepcion:'',
        nroFactura:0,
        nroRemito:0,
        nroOrdenCompra:0});
    console.log('Todo Limpito');
    console.log(this.trabajoActual);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaTrabajoPage');

    console.log(this.tipoTrabajo);

  }

  ionViewWillLeave(){
    this.events.unsubscribe('change-tab');
  }



}
