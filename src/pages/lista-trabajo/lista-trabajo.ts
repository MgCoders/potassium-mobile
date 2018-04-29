import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
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






    this.listaEstados.forEach(estado => {
      console.log("estado a solicitar:",estado);
      this.trabajoService.getByEstado(estado).subscribe(

        (data) => {
          loading.dismissAll();

          //Obtengo la lista desde el server con lo último
          data.forEach(
            Trabajo => {
              this.lista.push(new TrabajoImp(Trabajo));
              let c = new ClienteImp(Trabajo.cliente);
              console.log("estado",Trabajo.estado);
              /*var cli = this.listaClientes.filter(
                function (item) {
                  return item.id === c.id;
                })[0];
              console.log("cli",cli);
              if (cli === undefined) {*/
                this.listaClientes.push(c);
              /*}*/

            }
          );

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
    let yo = this;
    return this.listaClientes;/*.filter(
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
    return this.lista;/*.filter(
      function (item) {
        return yo.listaEstados.indexOf(item.motivoVisita) != -1 && (item.cliente.id === cli.id);
      });*/
  }

}
