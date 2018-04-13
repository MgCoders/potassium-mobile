import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SeleccionaTrabajoPage} from "../selecciona-trabajo/selecciona-trabajo";
import {Trabajo} from "../../app/_models/Trabajo";
import {TrabajoImp} from "../../app/_models/TrabajoImp";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {EquipoImp} from "../../app/_models/EquipoImp";
import {Equipo} from "../../app/_models/Equipo";
import {Cliente} from "../../app/_models/Cliente";
import {TrabajoService} from "../../app/_services/trabajo.service";

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
              public navParams: NavParams,
              private service: TrabajoService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {

    this.lista =[];
    this.listaClientes=[];
    this.listaEquipos=[];

    this.proceso = this.navParams.data['tipo'] == 'proceso';
    this.historial = this.navParams.data['tipo'] == 'historial';


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaTrabajoPage');
    console.log('Tipo: '+this.navParams.data['tipo']);
    this.tipo = this.navParams.data['tipo'];


    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading = this.loadingCtrl.create({
      content: 'Cargando la lista de clientes...'
    });
    let toastCorrecto = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError = this.toastCtrl.create({
      message: 'Error al obtener la lista de clientes..',
      duration: 3000,
      position: 'bottom'
    });


    this.service.getAll().subscribe(

      (data) => {
        loading.dismissAll();

        //Obtengo la lista desde el server con lo último
        data.forEach(
          Trabajo => {
            this.lista.push(new TrabajoImp(Trabajo));
            let c = new ClienteImp(Trabajo.cliente);

            var cli = this.listaClientes.filter(
              function (item) {
                return item.id === c.id;
              })[0];
            console.log("cli",cli);
            if (cli === undefined) {
              this.listaClientes.push(c);
            }

          })

        this.lista.sort(function(a, b) {
          return a.id - b.id;
        });
        console.log(this.listaClientes);

        console.log(this.lista);


        toastCorrecto.present();
      },
      (error) => {
        loading.dismissAll();
        toastError.setMessage(error);
        toastError.present();
      });
  }

  verTrabajo(id: number){
    this.navCtrl.push(SeleccionaTrabajoPage, {id:id});
  }

  filterClientes() {
    //Me quedo con los clientes que tengan trabajos de el tipo de la pantalla
    let yo = this;
    return this.listaClientes.filter(
      function (item) {
        //matcheo los trabajos que tengo, con los clientes
        return yo.lista.filter(
          function (itemLista) {

            //filtro los trabajos de la pantalla
            let retorno = false;
            retorno = retorno || yo.proceso && itemLista.motivoVisita != "FINALIZADO";
            retorno = retorno || yo.historial && itemLista.motivoVisita == "FINALIZADO";
            return retorno
          })[0];
      });
  }

  filterTrabajos(cli: Cliente) {

    //La misma lógica que la de arriba
    let yo = this;
    return this.lista.filter(
      function (item) {
        let retorno = false;
        retorno = retorno || yo.proceso && item.motivoVisita != "FINALIZADO";
        retorno = retorno || yo.historial && item.motivoVisita == "FINALIZADO";
        return retorno && (item.cliente.id === cli.id);
      });
  }

}
