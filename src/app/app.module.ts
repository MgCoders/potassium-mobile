import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler, Keyboard} from 'ionic-angular';
import { MyApp } from './app.component';

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
import {FilterPipe} from "../pipes/filter.pipe";
import {TrabajoService} from "./_services/trabajo.service";
import {TrabajoFotoService} from "./_services/trabajoFoto.service";
import {TipoEquipoService} from "./_services/tipoEquipo.service";
import {AltaDibujoPage} from "../pages/alta-dibujo/alta-dibujo";
import {ModalClientePage} from "../components/modal-cliente/modal-cliente";
import {ModalEquipoPage} from "../components/modal-equipo/modal-equipo";
import {ModalCamposPage} from "../components/modal-campos/modal-campos";
import {TareaService} from "./_services/tarea.service";
import {PuntoControlService} from "./_services/punto-control.service";
import {AltaRegistroPage} from "../pages/alta-registro/alta-registro";
import {ListaRegistroPage} from "../pages/lista-registro/lista-registro";
import {RubroService} from "./_services/rubro.service";
import {UsuarioService} from "./_services/usuario.service";
import {RegistroService} from "./_services/registro.service";
import {AltaPuntoControlPage} from "../pages/alta-puntocontrol/alta-puntocontrol";
import {ImagePicker} from "@ionic-native/image-picker";
import {MarcaEquipoService} from "./_services/marca-equipo.services";
import {VerificarPuntoControlPage} from "../pages/verificar-puntocontrol/verificar-puntocontrol";

@NgModule({
  declarations: [
    MyApp,
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
    FilterPipe,
    AltaDibujoPage,
    ModalClientePage,
    ModalEquipoPage,
    ModalCamposPage,
    AltaRegistroPage,
    ListaRegistroPage,
    AltaPuntoControlPage,
    VerificarPuntoControlPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    InterceptorModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist: false,
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthShortNames: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic' ],
      dayNames: ['domingo', 'lunes', 'martes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayShortNames: ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'],
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    AltaDibujoPage,
    ModalClientePage,
    ModalEquipoPage,
    ModalCamposPage,
    AltaRegistroPage,
    ListaRegistroPage,
    AltaPuntoControlPage,
    VerificarPuntoControlPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ClienteServices,
    TrabajoService,
    TrabajoFotoService,
    EquipoServices,
    TipoEquipoService,
    HttpClientModule,
    TareaService,
    PuntoControlService,
    Camera,
    Keyboard,
    RubroService,
    UsuarioService,
    RegistroService,
    ImagePicker,
    MarcaEquipoService

  ]
})
export class AppModule {}
