import { Component, ViewChild } from '@angular/core';

import {Platform, MenuController, Nav, Events} from 'ionic-angular';

import { RecepcionPage } from '../pages/recepcion/recepcion';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ListaTrabajoPage} from "../pages/lista-trabajo/lista-trabajo";
import {IngresarDetallesPage} from "../pages/ingresar-detalles/ingresar-detalles";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LoginPage;
  //rootPage = RecepcionPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Recepción de cliente', component: RecepcionPage },
      { title: 'Ver trabajos en proceso', component: ListaTrabajoPage },
      { title: 'Historial de trabajos', component: ListaTrabajoPage },
      { title: 'Cerrar sesión', component: LoginPage }
    ];

    events.subscribe('user:logout', () => {
      this.nav.setRoot(LoginPage, {tipo: 'proceso'});
      //this.rootPage = LoginPage;
    });


    events.subscribe('user:login', (token) => {

      localStorage.setItem('token', token);


    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if(page.title == "Historial de trabajos"){

      this.nav.setRoot(page.component, {tipo: 'historial'});

    } else if(page.title == "Ver trabajos en proceso"){

      this.nav.setRoot(page.component, {tipo: 'proceso'});

    } else {

      this.nav.setRoot(page.component);

    }


  }



}
