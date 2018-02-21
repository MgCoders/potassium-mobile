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

  trabajoActual: Trabajo;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private clienteServices: ClienteServices,
              events: Events) {
    this.tabCliente = ListaClientePage;
    this.tabEquipo = ListaEquipoPage;
    this.tabDetalles = IngresarDetallesPage;
    this.tabFirma = IngresarFirmaPage;
    this.tipoTrabajo = this.navParams.get('tipo');


    //Inicializo un trabajo en vacio
    let c = new ClienteImp({nombreEmpresa:'',personaContacto:'',telefonoContacto:''});
    let e = new EquipoImp({marca:'',modelo:'',matricula:'',color:''});
    this.trabajoActual = new TrabajoImp({cliente:c,equipo:e,motivoVisita:'',fechaRecepcion:'',fechaProvistaEntrega:'',requierePresupuesto:false,comentarios:'',estado:'',kmEquipoRecepcion:0,nombreClienteRecepcion:'',nroFactura:0,nroRemito:0,nroOrdenCompra:0});

    //declaro el listener en las tabs
    events.subscribe('change-tab', (tab, data) => {
      console.log('EVENT::ChangeTAB');

      //Las tabs van de [0,1,....]
      if(tab==1 /*&& this.trabajoActual.cliente.id == undefined*/){
        //Voy a la vista de equipo, y acaban de seleccionar al cliente
        console.log('TAB:: selecciona cliente');
        //this.trabajoActual.cliente = data;
        console.log(this.trabajoActual.cliente);
      }


      this.tabs.select(tab);

      console.log(this.trabajoActual);
    });
  }

  ionViewDidLoad() {
    console.log(this.tipoTrabajo);
    console.log('ionViewDidLoad AltaTrabajoPage');
  }

}
