import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler, Keyboard} from 'ionic-angular';
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
import {InterceptorModule} from "./_interceptor/token.interceptor";
import {EquipoServices} from "./_services/equipo.service";
import {VerTrabajoPage} from "../pages/ver-trabajo/ver-trabajo";
import {ListaTrabajoPage} from "../pages/lista-trabajo/lista-trabajo";
import {AltaFirmaPage} from "../pages/alta-firma/alta-firma";
import { Camera } from '@ionic-native/camera';
import {AltaDescripcionPage} from "../pages/alta-descripcion/alta-descripcion";
import {SeleccionaTrabajoPage} from "../pages/selecciona-trabajo/selecciona-trabajo";
import {ListaPuntocontrolPage} from "../pages/lista-puntocontrol/lista-puntocontrol";
import {ListaTareaPage} from "../pages/lista-tarea/lista-tarea";
import {AltaTareaPage} from "../pages/alta-tarea/alta-tarea";
import {CalendarioPage} from "../pages/calendario/calendario";
import {SeleccionaTareaPage} from "../pages/selecciona-tarea/selecciona-tarea";
import {HideHeaderDirective} from "../directives/hide-header/hide-header";
import {AltaHorasPage} from "../pages/alta-horas/alta-horas";

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
    AltaDescripcionPage,
    AltaFirmaPage,
    SeleccionaTrabajoPage,
    ListaPuntocontrolPage,
    ListaTareaPage,
    AltaTareaPage,
    CalendarioPage,
    SeleccionaTrabajoPage,
    SeleccionaTareaPage,
    HideHeaderDirective,
    AltaHorasPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    InterceptorModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist: false
    })
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
    AltaFirmaPage,
    AltaDescripcionPage,
    ListaPuntocontrolPage,
    ListaTareaPage,
    AltaTareaPage,
    CalendarioPage,
    SeleccionaTrabajoPage,
    SeleccionaTareaPage,
    AltaHorasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ClienteServices,
    EquipoServices,
    HttpClientModule,
    Camera,
    Keyboard
  ]
})
export class AppModule {}
