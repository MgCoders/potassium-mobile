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
import {Material} from "../../app/_models/Material";
import {TareaMaterial} from "../../app/_models/TareaMaterial";
import {TareaMaterialImp} from "../../app/_models/TareaMaterialImp";
import {PuntoControlImp} from "../../app/_models/PuntoControlImp";
import {Trabajo} from "../../app/_models/Trabajo";
import {MaterialImp} from "../../app/_models/MaterialImp";
import {MaterialService} from "../../app/_services/material.service";
import {TareaService} from "../../app/_services/tarea.service";
import {IonicSelectableComponent} from "ionic-selectable";
import {Port} from "../../app/types";
import {PortService} from "../../app/_services/port.service";

/**
 * Generated class for the AltaTareaMaterialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-regtareamaterialistro',
  templateUrl: 'alta-tareamaterial.html',
})
export class AltaTareaMaterialPage {

  tareaMaterialActual: TareaMaterial;
  tareaMaterialActual_param: TareaMaterial;
  idTareaSeleccionada: number;


  editar: boolean = false;

  trabajoActual: Trabajo;
  tareaActual: Tarea;

  cantUsado: number = 0;

  listaMateriales: Material[];
  material: Material;

  materialSeleccionado:number;

  //ports: Port[];
  //port: Port;

  constructor(public navCtrl: NavController,
              private registroService: RegistroService,
              private usuarioService: UsuarioService,
              private rubroService: RubroService,
              private materialService: MaterialService,
              private tareaService: TareaService,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private portService: PortService) {


    console.log("Entro a TareaMaterial");

    console.log("this.navParams.", this.navParams);


    //this.ports = this.portService.getPorts();

    //Inicializo en vacío
    this.tareaMaterialActual_param = this.navParams.data['tareaMaterial'];
    this.idTareaSeleccionada = this.navParams.data['idTareaSel'];
    console.log("tareaMaterialActual por param:", this.tareaMaterialActual_param);
    console.log("idTareaSel por param:", this.idTareaSeleccionada);


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

    let id = (this.tareaMaterialActual_param != undefined) ? this.tareaMaterialActual_param.id : undefined;

    let tareas = [];
    let usuario = new UsuarioImp({email: "", nombre: "", apellido:"", role: "", password: "", login:false, pin:"" });
    let pc = new PuntoControlImp({nombre:'', trabajo:this.trabajoActual, responsable: usuario, responsable2: usuario, orden:0, tareas: tareas, verificado: false, verificado2: false, paraVerificar: false});
    let tarea = new TareaImp({nombre: '',descripcion:'', minutosEstimados:-1, puntoControl:pc, completa:false, necesitaVerificacion:false,verificada:false});
    let mater = new MaterialImp({nombre: ''});

    this.tareaMaterialActual = new TareaMaterialImp({tarea: tarea, cantidad: -1, material: mater});


    if(id != undefined) {
      this.tareaMaterialActual = this.tareaMaterialActual_param;
      this.editar = true;
    }

    let toastError_ar_4 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    this.listaMateriales = [];
    console.log("Traigo la lista de materiales.");
    this.materialService.getAll().subscribe(
      (data) => {
        data.forEach((mat) => {

          this.listaMateriales.push(new MaterialImp(mat));
        });
        console.log("Lista de usuarios materiales:", this.listaMateriales);
      },
      (error) => {
        toastError_ar_4.setMessage(error);
        toastError_ar_4.present();
      }
    );


    this.tareaService.get(this.idTareaSeleccionada).subscribe(
      (data) => {

        console.log("Tarea traidea desde el server:", data);

        //Obtengo la lista desde el server con lo último
        this.tareaActual = new TareaImp(data);

        console.log("tareaActual:", this.tareaActual);
      },
      (error) => {
      });

  }






  materialChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
    this.materialSeleccionado = event.value;
  }


  reloadList(event: {
    component: IonicSelectableComponent,
    text: string
  }){

    let textEntered = event.text;

    if(textEntered.length  < 3){
      return false;
    }

    this.listaMateriales = [];
    event.component.startSearch();

    let toastError_ar_4 = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    console.log("textEntered",textEntered);

    this.materialService.getAll_x_Filtro(textEntered).subscribe(
      (data) => {
        data.forEach((mat) => {
          event.component.endSearch();
          this.listaMateriales.push(new MaterialImp(mat));

          event.component.items = this.listaMateriales;

          // Get ports from a storage and stop searching.
          event.component.endSearch();

        })
        console.log("Lista de usuarios materiales:", this.listaMateriales);
      },
      (error) => {
        toastError_ar_4.setMessage(error);
        toastError_ar_4.present();
      }
    );
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



  cargarMaterial(){


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



    this.listaMateriales.forEach( (x) =>{
      if(x.id == this.materialSeleccionado){
        this.tareaMaterialActual.material = x;
      }
    });

    this.tareaMaterialActual.cantidad = this.cantUsado;

    this.tareaMaterialActual.tarea = this.tareaActual;


    if(!this.validarCamposAltaRegistro()) {
      return;
    }








    loading_ar_5.present();

    if (!this.editar) {
      this.tareaService.createTareaMaterial(this.tareaMaterialActual).subscribe(
        (data) => {
          toastCorrecto_ar_5.present();
          loading_ar_5.dismissAll();
          this.tareaMaterialActual = new TareaMaterialImp(data);
          console.log("tareaMaterialActual: OK", this.tareaMaterialActual);
          this.navCtrl.pop();

        },
        (error) => {
          toastError_ar_5.setMessage(error);
          toastError_ar_5.present();
        });
    } else {
      this.tareaService.editTareaMaterial(this.tareaMaterialActual).subscribe(
        (data) => {
          toastCorrecto_ar_5.present();
          loading_ar_5.dismissAll();
          this.tareaMaterialActual = new TareaMaterialImp(data);
          console.log("Edición de tareaMaterialActual: OK", this.tareaMaterialActual);
          this.navCtrl.pop();
        },
        (error) => {
          toastError_ar_5.setMessage(error);
          toastError_ar_5.present();
        });
    }
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

    console.log("Validando cantidad: ", this.tareaMaterialActual.cantidad);
    console.log("Validando id: ", this.tareaMaterialActual.id);
    console.log("Validando material: ", this.tareaMaterialActual.material);
    console.log("Validando tarea: ", this.tareaMaterialActual.tarea);




    //if(valido && (this.registroActual.fecha == undefined || !this.registroActual.fecha.match(/\d\d-\d\d-\d\d\d\d \d\d:\d\d/g))){
    if(valido && (this.tareaMaterialActual.cantidad == undefined || this.tareaMaterialActual.cantidad <= 0)){
      mensaje = 'Cantidad Inválida';
      valido = false;
    }
    if(valido && (this.tareaMaterialActual.material == undefined || this.tareaMaterialActual.material.id == undefined)){
      mensaje = 'Material Inválido';
      valido = false;
    }
    if(valido && (this.tareaMaterialActual.tarea == undefined || this.tareaMaterialActual.tarea.id == undefined)){
      mensaje = 'Tarea inválida';
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
