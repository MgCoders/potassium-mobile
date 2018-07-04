import { Component } from '@angular/core';
import {
  Events,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  Toast,
  ToastController
} from 'ionic-angular';
import {SeleccionaTrabajoPage} from "../selecciona-trabajo/selecciona-trabajo";
import {Trabajo} from "../../app/_models/Trabajo";
import {TrabajoImp} from "../../app/_models/TrabajoImp";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {Equipo} from "../../app/_models/Equipo";
import {Cliente} from "../../app/_models/Cliente";
import {TrabajoService} from "../../app/_services/trabajo.service";
import {AltaTrabajoPage} from "../alta-trabajo/alta-trabajo";

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
  listaEstados: string[];
  proceso: boolean;
  historial: boolean;
  recuperar: boolean;

  toast: Toast;
  loading: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private trabajoService: TrabajoService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {

    this.lista =[];
    this.listaClientes=[];
    this.listaEquipos=[];
    this.listaEstados = [];


    this.proceso = this.navParams.data['tipo'] == 'proceso';
    this.historial = this.navParams.data['tipo'] == 'historial';
    this.recuperar = this.navParams.data['tipo'] == 'recuperar';


    if (this.proceso) {
      this.listaEstados.push('EN_ESPERA');
      this.listaEstados.push('EN_PUNTO_CONTROL');
      this.listaEstados.push('EN_PROCESO');
      this.listaEstados.push('RECIBIDO');
    } else if (this.historial) {
      this.listaEstados.push('FINALIZADO');
    } else if (this.recuperar) {
      this.listaEstados.push('CREADO');
    }

    /*

    PENDIENTE_REMITO              -> NO
    PENDIENTE_FACTURA             -> NO
    PENDIENTE_ASIGNACION_VALORES  -> NO
    EN_ESPERA                     -> En Proceso
    EN_PUNTO_CONTROL              -> En Proceso
    PENDIENTE_PRESUPUESTO         -> NO
    FINALIZADO                    -> Historial
    EN_PROCESO                    -> En Proceso
    RECIBIDO                      -> En Proceso
    CREADO                        -> Recuperar

    */


  }



  showLoading() {
    try {
      this.loading.dismissAll();
    } catch(e) {}

    this.loading = this.loadingCtrl.create({
      content: 'Cargando la lista de clientes...',
      duration: 1000,
    });
    this.loading.present();
  }


  ionViewWillEnter() {
    console.log('ionViewDidLoad ListaTrabajoPage');
    console.log('Tipo: '+this.navParams.data['tipo']);
    this.tipo = this.navParams.data['tipo'];


    this.showLoading();

    this.listaClientes = [];
    this.lista = [];

    this.listaEstados.forEach(estado => {
      console.log("estado a solicitar:",estado);
      this.trabajoService.getByEstado(estado).subscribe(

        (data) => {

          //Obtengo la lista desde el server con lo último
          data.forEach(

            Trabajo => {

              this.lista.push(new TrabajoImp(Trabajo));
              let c = new ClienteImp(Trabajo.cliente);

              this.listaClientes.push(c);


            }
          );

          console.log("listaClientes", this.listaClientes);
          console.log("lista", this.lista);


          this.lista.sort(function(a, b) {
            return a.id - b.id;
          });



        },
        (error) => {
        });

    } );

  }



  switchTrabajo(id: number) {
    if(this.recuperar){
      this.recuperarTrabajo(id);
    } else {
      this.verTrabajo(id);
    }
  }

  recuperarTrabajo(id: number){
    this.navCtrl.push(AltaTrabajoPage, {tipo:"recuperar", id:id});
  }


  verTrabajo(id: number){
    this.navCtrl.push(SeleccionaTrabajoPage, {id:id});
  }


  filterClientes() {
    //Me quedo con los clientes que tengan trabajos de el tipo de la pantalla
    var seen = {};
    return this.listaClientes.filter(function(item){
      if(seen.hasOwnProperty(item.id)){
        return false;
      }else{
        seen[item.id] = true;
        return true;
      } } );
    /*.filter(
      function (item) {
        //matcheo los trabajos que tengo, con los clientes
        return yo.lista.filter(
          function (itemLista) {

            //filtro los trabajos de la pantalla

            return yo.listaEstados.indexOf(itemLista.motivoVisita) != -1;
          })[0];
      });*/
  }

  filterTrabajos(cli: Cliente) {

    //La misma lógica que la de arriba
    let yo = this;
    return this.lista.filter( function (item) {
      return (item.cliente.id == cli.id);
    });/*.filter(
      function (item) {
        return yo.listaEstados.indexOf(item.motivoVisita) != -1 && (item.cliente.id === cli.id);
      });*/
  }

}
