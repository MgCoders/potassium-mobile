import { Component } from '@angular/core';

import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {RecepcionPage} from "../recepcion/recepcion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../app/_services/auth.service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
              private formBuilder: FormBuilder) {
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
    this.formSubmitted = true;
    this.authService.login(this.model.email, this.model.password)
      .subscribe((result) => {
          console.info(result);
          if (result === true) {
            console.log('LOGINA!' + this.returnUrl);
            this.navCtrl.setRoot(RecepcionPage, {});
          }
        } ,
        (err) => {
          console.log('NO LOG');
          //console.log('mail: '+this.model.email+' - pass: '+this.model.password);
          this.onResetForm();
        });
  }

  onResetForm() {
    this.formSubmitted = false;
    this.validationForm.reset();
  }

  //validateLogin(){
    //this.navCtrl.setRoot(RecepcionPage, {});
  //}

}
