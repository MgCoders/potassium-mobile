import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { RecepcionPage } from '../pages/recepcion/recepcion';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AltaTrabajoPage} from "../pages/alta-trabajo/alta-trabajo";
import {ListaClientePage} from "../pages/lista-cliente/lista-cliente";
import {ListaEquipoPage} from "../pages/lista-equipo/lista-equipo";
import {IngresarDetallesPage} from "../pages/ingresar-detalles/ingresar-detalles";
import {IngresarFirmaPage} from "../pages/ingresar-firma/ingresar-firma";
import {AuthService} from "./_services/auth.service";
import { HttpModule } from '@angular/http';
import {AltaClientePage} from "../pages/alta-cliente/alta-cliente";
import {AltaEquipoPage} from "../pages/alta-equipo/alta-equipo";
import {ClienteServices} from "./_services/cliente.services";
import {HttpClientModule} from "@angular/common/http";
import {Dialogs} from "@ionic-native/dialogs";
import {InterceptorModule} from "./_interceptor/token.interceptor";
import {EquipoServices} from "./_services/equipo.service";
import {VerTrabajoPage} from "../pages/ver-trabajo/ver-trabajo";
import {ListaTrabajoPage} from "../pages/lista-trabajo/lista-trabajo";
import { CanvasDraw } from '../components/canvas-draw/canvas-draw';
import {AltaFirmaPage} from "../pages/alta-firma/alta-firma";

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    RecepcionPage,
    LoginPage,
    AltaTrabajoPage,
    ListaClientePage,
    ListaEquipoPage,
    IngresarDetallesPage,
    IngresarFirmaPage,
    AltaClientePage,
    AltaEquipoPage,
    ListaTrabajoPage,
    VerTrabajoPage,
    CanvasDraw,
    AltaFirmaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    InterceptorModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    RecepcionPage,
    LoginPage,
    AltaTrabajoPage,
    ListaClientePage,
    ListaEquipoPage,
    IngresarDetallesPage,
    IngresarFirmaPage,
    AltaClientePage,
    AltaEquipoPage,
    ListaTrabajoPage,
    VerTrabajoPage,
    AltaFirmaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ClienteServices,
    EquipoServices,
    HttpClientModule

  ]
})
export class AppModule {}
