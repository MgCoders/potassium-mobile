import { Component } from '@angular/core';

import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';

import {RecepcionPage} from "../recepcion/recepcion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../app/_services/auth.service";
import {PortService} from "../../app/_services/port.service";
import {Port} from "../../app/types";
import {IonicSelectableComponent} from "ionic-selectable";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  model: any = {};
  returnUrl: string;

  validationForm: FormGroup;
  formSubmitted = false;



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              public menu: MenuController,
              private toastCtrl: ToastController) {

    this.menu.enable(false);



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }





  ngOnInit(): void {
    // reset login status
    if (this.authService.getCurrentUser() != null) {
      this.model['email'] = this.authService.getCurrentUser().email;
    }
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = "/";

    this.buildForm();
  }

  buildForm() {
    this.validationForm = this.formBuilder.group({
      password: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
    });
  }

  login() {
    //this.navCtrl.setRoot(RecepcionPage, {});

    if(!this.validateLogin()) {
      return;
    }



    this.formSubmitted = true;
    this.authService.login(this.model.email, this.model.password)
      .subscribe(
        (result) => {
            console.info(result);
            if (result === true) {
              console.log('LOGINA!' + this.returnUrl);
              this.menu.enable(true);
              this.navCtrl.setRoot(RecepcionPage, {});
            }
          } ,
        (err) => {
            console.log('NO LOG');
            console.log(JSON.stringify(err));
            //console.log('mail: '+this.model.email+' - pass: '+this.model.password);
            this.onResetForm();
          }
        );

  }

  onResetForm() {
    this.formSubmitted = false;
    this.validationForm.reset();
  }



  validateLogin(){

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";



    console.log("Validando Campos: ");


    if(valido && (this.model.email == undefined || this.model.email == "")){
      mensaje = 'No se ingresó email';
      valido = false;
    }


    if(valido && (this.model.password == undefined || this.model.password == "")){
      mensaje = 'No se ingresó contraseña';
      valido = false;
    }

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    return valido;


  }



  pressed(){
    console.log("[pressed]");
  }

  active(){
    console.log("[active]");
  }

  released(){
    console.log("[released]");
  }


}
