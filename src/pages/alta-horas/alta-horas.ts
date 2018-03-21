import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AltaHorasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-horas',
  templateUrl: 'alta-horas.html',
})
export class AltaHorasPage {

  hoy= '1995-04-15';
  estado: number;
  rubro: number;
  comienzo: string;
  fin: string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    //hora de montevideo!
    let d = new Date();
    this.hoy = d.toISOString();
    this.comienzo = this.calculateTime('-3');
    this.fin = this.calculateTime('-3');
    this.estado=1;
    this.rubro=1;
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
    this.navCtrl.pop();
  }

}
