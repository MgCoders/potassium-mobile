import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Equipo} from "../../app/_models/Equipo";
import {EquipoServices} from "../../app/_services/equipo.service";
import {EquipoImp} from "../../app/_models/EquipoImp";
import {TipoEquipoImp} from "../../app/_models/TipoEquipoImp";
import {TipoEquipo} from "../../app/_models/TipoEquipo";
import {TipoEquipoService} from "../../app/_services/tipoEquipo.service";

/**
 * Generated class for the AltaEquipoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-equipo',
  templateUrl: 'alta-equipo.html',
})
export class AltaEquipoPage {

  equipoActual: Equipo;
  listaTipoEquipo: TipoEquipo[];
  editar: boolean;

  @ViewChild('modelo') VCmodelo ;
  @ViewChild('marca') VCmarca ;
  @ViewChild('color') VCcolor ;
  @ViewChild('matricula') VCmatricula ;
  @ViewChild('numeroChasis') VCnumeroChasis ;
  @ViewChild('descripcion') VCdescripcion;



  constructor(public navCtrl: NavController,
              private equipoService: EquipoServices,
              private tipoEquipoService:TipoEquipoService,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {


    let loading_ae = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto_ae = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_ae = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    let te = new TipoEquipoImp({descripcion:'', dibujo: '', id:-1});

    //Inicializo en vacío
      this.equipoActual =  new EquipoImp({marca:'',modelo:'',matricula:'',color:'', numeroChasis: '', cliente:this.navParams.data['cliente'], descripcion: '' , tipoEquipo: te} );

    let id = this.navParams.data['id'];

    if(id != undefined){
      console.log('Edicion de equipo!');
      this.editar = true;
      this.equipoService.get(id).subscribe(
        (data) => {
          toastCorrecto_ae.present();
          loading_ae.dismissAll();
          this.equipoActual = data;
        },
        (error) => {
          toastError_ae.setMessage(error);
          toastError_ae.present();
        });
    }
    console.log(this.equipoActual);

    this.listaTipoEquipo = [];

    this.tipoEquipoService.getAll().subscribe(
      (data) => {

        data.forEach( item => {
          this.listaTipoEquipo.push(item);
        });

      },
      (error) => {
        console.log(error);

      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaEquipoPage');
  }


  guardarEquipo() {


    this.equipoActual.tipoEquipo = this.listaTipoEquipo.find(  te => te.id === this.equipoActual.tipoEquipo.id );


    if(!this.validarCamposAltaEquipo()) {
      return;

    }

    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_ae_2 = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto_ae_2 = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_ae_2 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    console.log('Equipo antes');
    console.log(this.equipoActual);

    loading_ae_2.present();
    if (!this.editar) {
      console.log('Creo un nuevo equipo');
      console.log(this.equipoActual);

      this.equipoService.create(this.equipoActual).subscribe(
        (data) => {
          toastCorrecto_ae_2.present();
          loading_ae_2.dismissAll();
          this.equipoActual = new EquipoImp(data);
          this.navCtrl.pop();
          console.log('Equipo después');
          console.log(this.equipoActual);
        },
        (error) => {
          console.log(error.toString());
          toastError_ae_2.setMessage(error);
          toastError_ae_2.present();
        });
    } else {
      this.equipoService.edit(this.equipoActual).subscribe(
        (data) => {
          toastCorrecto_ae_2.present();
          loading_ae_2.dismissAll();
          this.equipoActual = new EquipoImp(data);
          this.navCtrl.pop();
          console.log('Equipo después');
          console.log(this.equipoActual);
        },
        (error) => {
          toastError_ae_2.setMessage(error);
          toastError_ae_2.present();
        });
    }

  }



  validarCamposAltaEquipo(){

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";
    console.log("Validando Cliente: ", this.equipoActual);

    if(this.equipoActual == undefined){
      mensaje = 'Equipo no definido';
      valido = false;
    }


    if(valido && (this.equipoActual.cliente == undefined || this.equipoActual.cliente.id == undefined)) {
      mensaje = 'Equipo sin cliente';
      valido = false;
    }

    if(valido && (this.equipoActual.tipoEquipo == undefined || this.equipoActual.tipoEquipo.id == undefined)) {
      mensaje = 'Equipo sin tipo seleccionado';
      valido = false;
    }

    if(valido && (this.equipoActual.descripcion == undefined || this.equipoActual.descripcion == '')) {
      mensaje = 'Equipo sin descripcón';
      valido = false;
    }

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    return valido;

  }






  /*

    @ViewChild('modelo') VCmodelo ;
    @ViewChild('marca') VCmarca ;
    @ViewChild('color') VCcolor ;
    @ViewChild('matricula') VCmatricula ;
    @ViewChild('numeroChasis') VCnumeroChasis ;
    @ViewChild('descripcion') VCdescripcion;

   */

  goMAR_ae(){
    setTimeout(() => {
      this.VCmarca.setFocus();
    },150);
  }

  goCOL_ae(){
    setTimeout(() => {
      this.VCcolor.setFocus();
    },150);
  }

  goMAT_ae(){
    setTimeout(() => {
      this.VCmatricula.setFocus();
    },150);
  }

  goNUM_ae(){
    setTimeout(() => {
      this.VCnumeroChasis.setFocus();
    },150);
  }

  goDES_ae(){
    setTimeout(() => {
      this.VCdescripcion.setFocus();
    },150);
  }


}
