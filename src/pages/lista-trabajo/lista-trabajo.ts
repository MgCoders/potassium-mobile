import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AltaClientePage} from "../alta-cliente/alta-cliente";
import {SeleccionaTrabajoPage} from "../selecciona-trabajo/selecciona-trabajo";
import {Trabajo} from "../../app/_models/Trabajo";
import {TrabajoImp} from "../../app/_models/TrabajoImp";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {EquipoImp} from "../../app/_models/EquipoImp";
import {Equipo} from "../../app/_models/Equipo";
import {Cliente} from "../../app/_models/Cliente";

/**
 * Generated class for the ListaTrabajoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-trabajo',
  templateUrl: 'lista-trabajo.html',
})
export class ListaTrabajoPage {

  tipo: string;
  lista: Trabajo[];
  listaClientes: Cliente[];
  listaEquipos:Equipo[];
  proceso: boolean;
  historial: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    this.lista =[];
    this.listaClientes=[];
    this.listaEquipos=[];

    this.proceso = this.navParams.data['tipo'] == 'proceso';
    this.historial = this.navParams.data['tipo'] == 'historial';

    for(let clientes=0; clientes <= 3; clientes++) {

      let c = new ClienteImp({nombreEmpresa:'Cliente '+clientes,personaContacto:'',telefonoContacto:''});
      this.listaClientes.push(c);
      let equipos = (Math.floor(Math.random()*20)+1)%5;

      for(let eq=0; eq <= equipos; eq++) {

        let e = new EquipoImp({marca: 'Equipo '+equipos, modelo: '', matricula: '', color: ''});
        this.listaEquipos.push(e);
        let t =
          new TrabajoImp({
            cliente: c,
            equipo: e,
            motivoVisita: ((equipos%2) == 0) ? 'Reparacion' : 'Nuevo',
            fechaRecepcion: '',
            fechaProvistaEntrega: '',
            requierePresupuesto: false,
            comentarios: '',
            estado: '',
            kmEquipoRecepcion: 0,
            nombreClienteRecepcion: '',
            nroFactura: 0,
            nroRemito: 0,
            nroOrdenCompra: 0
          });

        this.lista.push(t);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaTrabajoPage');
    console.log('Tipo: '+this.navParams.data['tipo']);
    this.tipo = this.navParams.data['tipo'];
  }

  verTrabajo(){
    this.navCtrl.push(SeleccionaTrabajoPage, {});
  }


}
