import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { RecepcionPage } from '../pages/recepcion/recepcion';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AltaTrabajoPage} from "../pages/alta-trabajo/alta-trabajo";
import {SeleccionaClientePage} from "../pages/selecciona-cliente/selecciona-cliente";
import {SeleccionaEquipoPage} from "../pages/selecciona-equipo/selecciona-equipo";
import {IngresarDetallesPage} from "../pages/ingresar-detalles/ingresar-detalles";
import {IngresarFirmaPage} from "../pages/ingresar-firma/ingresar-firma";
import {AuthService} from "./_services/auth.service";
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ListPage,
    RecepcionPage,
    LoginPage,
    AltaTrabajoPage,
    SeleccionaClientePage,
    SeleccionaEquipoPage,
    IngresarDetallesPage,
    IngresarFirmaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ListPage,
    RecepcionPage,
    LoginPage,
    AltaTrabajoPage,
    SeleccionaClientePage,
    SeleccionaEquipoPage,
    IngresarDetallesPage,
    IngresarFirmaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
