import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {IonicSelectableModule} from "ionic-selectable";
import {LongPressModule} from "ionic-long-press";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    LongPressModule

  ],
})
export class LoginPageModule {}
