import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Cliente} from "../../app/_models/Cliente";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {ClienteServices} from "../../app/_services/cliente.services";
import {EquipoImp} from "../../app/_models/EquipoImp";
import {RegistroImp} from "../../app/_models/RegistroImp";
import {TareaImp} from "../../app/_models/TareaImp";
import {Registro} from "../../app/_models/Registro";
import {RegistroService} from "../../app/_services/registro.service";
import {Usuario} from "../../app/_models/Usuario";
import {Rubro} from "../../app/_models/Rubro";
import {UsuarioService} from "../../app/_services/usuario.service";
import {RubroService} from "../../app/_services/rubro.service";
import {UsuarioImp} from "../../app/_models/UsuarioImp";
import {RubroImp} from "../../app/_models/RubroImp";
import {Tarea} from "../../app/_models/Tarea";

/**
 * Generated class for the AltaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-registro',
  templateUrl: 'alta-registro.html',
})
export class AltaRegistroPage {

  registroActual: Registro;
  registroActual_param: Registro;
  tareaActual: Tarea;
  editar: boolean;
  usuarioseleccionado: number =0;
  rubroseleccionado: number =0;
  cantMinutos: number = 0;

  listaUsuarios: Usuario[];
  listaRubros: Rubro[];


  hoy= '1995-04-15';
  estado: number;
  rubro: number;
  comienzo: string;
  fin: string;

  constructor(public navCtrl: NavController,
              private registroService: RegistroService,
              private usuarioService: UsuarioService,
              private rubroService: RubroService,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {


    //hora de montevideo!
    let d = new Date();
    this.hoy = d.toISOString();
    this.comienzo = this.calculateTime('-3');
    this.fin = this.calculateTime('-3');
    this.estado=1;
    this.rubro=1;



    //Inicializo en vacío
    this.registroActual_param = this.navParams.data['registro'];
    this.registroActual = this.registroActual_param;


    this.tareaActual = this.navParams.data['tarea'];


    let loading_ar = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto_ar = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_ar = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });



    let id = (this.registroActual_param != undefined) ? this.registroActual_param.id : undefined;

    let user = new UsuarioImp({id: -1, email: '',nombre:'', apellido:"", role: '', password:'', login:false, pin:""});
    let rub = new RubroImp( {nombre:'', descripcion: '', id: -1} ) ;
    this.registroActual = (this.registroActual != undefined) ?
                            this.registroActual
                          :
                            new RegistroImp({minutos:0, fecha: '', tarea: this.tareaActual, usuario: user, rubro: rub, borrado:0});



    if(id != undefined){
      console.log('Edicion de registro!');
      this.editar = true;
      console.log("RA (_param): ", this.registroActual_param);
      this.rubroseleccionado = (this.registroActual_param.rubro == undefined) ? -1 : this.registroActual_param.rubro.id;
      this.usuarioseleccionado = (this.registroActual_param.usuario == undefined) ? -1 : this.registroActual_param.usuario.id;
      this.cantMinutos = this.registroActual_param.minutos;

      loading_ar.present();
      this.registroService.get(id).subscribe(
        (data) => {
          toastCorrecto_ar.present();
          loading_ar.dismissAll();
          this.registroActual = data;
        },
        (error) => {
          toastError_ar.setMessage(error);
          toastError_ar.present();
        });
    }
    console.log(this.registroActual);

    let toastError_ar_4 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    this.listaUsuarios = [];
    console.log("Traigo la lista de usuarios.");
    this.usuarioService.getAll().subscribe(
      (data) => {
        data.forEach( (usr) => {

          this.listaUsuarios.push( new UsuarioImp(usr));
        })
        console.log("Lista de usuarios después:", this.listaUsuarios);
      },
      (error) => {
        toastError_ar_4.setMessage(error);
        toastError_ar_4.present();
      });











    let toastError_ar_3 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });


    this.listaRubros = [];
    console.log("Traigo la lista de rubros.");

    this.rubroService.getAll().subscribe(
      (data) => {
        data.forEach( (rub) => {

          this.listaRubros.push( new RubroImp(rub));
        })

        console.log("Lista de rubros después:", this.listaRubros);
      },
      (error) => {
        toastError_ar_3.setMessage(error);
        toastError_ar_3.present();
      });








  }

  ionViewDidLoad() {

  }

  guardarRegistro() {
/*
    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)

    let toastError_ar_2 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    console.log('Registro antes');
    console.log(this.registroActual);






    if (!this.editar) {
      this.registroService.create(this.registroActual).subscribe(
        (data) => {

          this.registroActual = new RegistroImp(data);
        },
        (error) => {
          toastError_ar_2.setMessage(error);
          toastError_ar_2.present();
        });
    } else {
      this.registroService.edit(this.registroActual).subscribe(
        (data) => {

          this.registroActual = new RegistroImp(data);
        },
        (error) => {
          toastError_ar_2.setMessage(error);
          toastError_ar_2.present();
        });
    }
    console.log('Registro después');
    console.log(this.registroActual);
    this.navCtrl.pop();
  */

  }




  calculateTime(offset: any) {
    // create Date object for current location
    let d = new Date();


    // create new Date object for different city
    // using supplied offset
    let nd = new Date(d.getTime() + (3600000 * offset));

    return nd.toISOString();
  }




  registrarHoras(){


    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_ar_5 = this.loadingCtrl.create({
      content: 'Procesando...'
    });
    let toastCorrecto_ar_5 = this.toastCtrl.create({
      message: 'Datos cargados correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_ar_5 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });


    //Seteo la info antes de pushear
    console.log("hoy:"+ this.hoy);
    let anio = this.hoy.substring(0, 4);
      let dia = this.hoy.substring(8, 10);
      let mes = this.hoy.substring(5, 7);
      let hora = this.hoy.substring(11, 16);
    this.registroActual.fecha = dia+'-'+mes+'-'+anio;//+' '+hora;

    //29-06-2018 18:06



    //let  = {};
    this.listaUsuarios.forEach( (x) =>{
      if(x.id == this.usuarioseleccionado){
        this.registroActual.usuario = x;
      }
    });

    this.listaRubros.forEach( (x) =>{
      if(x.id == this.rubroseleccionado){
        this.registroActual.rubro = x;
      }
    });


    this.registroActual.minutos = this.cantMinutos;

    console.log('Registro antes');
    console.log(this.registroActual);



    if(!this.validarCamposAltaRegistro()) {
      return;
    }








    loading_ar_5.present();

    if (!this.editar) {
      this.registroService.create(this.registroActual).subscribe(
        (data) => {
          toastCorrecto_ar_5.present();
          loading_ar_5.dismissAll();
          this.registroActual = new RegistroImp(data);
          console.log("Alta Registro: OK", this.registroActual);
          this.navCtrl.pop();

        },
        (error) => {
          toastError_ar_5.setMessage(error);
          toastError_ar_5.present();
        });
    } else {
      this.registroService.edit(this.registroActual).subscribe(
        (data) => {
          toastCorrecto_ar_5.present();
          loading_ar_5.dismissAll();
          this.registroActual = new RegistroImp(data);
          console.log("Edición de Registro: OK", this.registroActual);
          this.navCtrl.pop();
        },
        (error) => {
          toastError_ar_5.setMessage(error);
          toastError_ar_5.present();
        });
    }
    console.log('registro después');
    console.log(this.registroActual);


  }




  validarCamposAltaRegistro(){

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";

    console.log("Validando hoy: ", this.registroActual.fecha);
    console.log("Validando hoy: ", this.registroActual.minutos);
    console.log("Validando hoy: ", this.registroActual.usuario);
    console.log("Validando hoy: ", this.registroActual.rubro);
    console.log("Validando hoy: ", this.registroActual.tarea);




    //if(valido && (this.registroActual.fecha == undefined || !this.registroActual.fecha.match(/\d\d-\d\d-\d\d\d\d \d\d:\d\d/g))){
    if(valido && (this.registroActual.fecha == undefined || !this.registroActual.fecha.match(/\d\d-\d\d-\d\d\d\d/g))){
      mensaje = 'Formato de fecha inválido';
      valido = false;
    }
    if(valido && (this.registroActual.minutos == undefined || this.registroActual.minutos == 0)){
      mensaje = 'No se ingresó minutos';
      valido = false;
    }
    if(valido && (this.registroActual.usuario == undefined || this.registroActual.usuario.id == undefined)){
      mensaje = 'No se ingresó usuario';
      valido = false;
    }
    if(valido && (this.registroActual.rubro == undefined || this.registroActual.rubro.id == undefined)){
      mensaje = 'No se ingresó rubro';
      valido = false;
    }
    if(valido && (this.registroActual.tarea == undefined || this.registroActual.tarea.id == undefined)){
      mensaje = 'No se ingresó tarea';
      valido = false;
    }

    if(valido && (this.registroActual.tarea == undefined || this.registroActual.tarea.completa == true)){
      mensaje = 'La tarea ya está completa';
      valido = false;
    }

    //Estos campos no requieren validación
    //this.clienteActual.telefono
    //this.clienteActual.direccion

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    return valido;



  }



}
