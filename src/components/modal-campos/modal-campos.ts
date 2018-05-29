import { Component } from '@angular/core';

import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import {Trabajo} from "../../app/_models/Trabajo";


@Component({
  templateUrl: 'modal-campos.html'
})


export class ModalCamposPage {
  character;
  trabajoActual: Trabajo = null;
  rueda_auxiliar: String = null;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {

    this.trabajoActual = this.params.get('trabajoActual');
    console.log("trabajoActual: ",this.trabajoActual);

    console.log("params: ",this.params);

    if(!this.trabajoActual.equipoAuxiliar){
      this.rueda_auxiliar = 'no';
    } else if(this.trabajoActual.equipoAuxiliar && this.trabajoActual.equipoAuxiliarArmada){
      this.rueda_auxiliar = 'armada'
    } else if(this.trabajoActual.equipoAuxiliar && this.trabajoActual.equipoAuxiliarArmada){
      this.rueda_auxiliar = 'solo_disco'
    }

    /*
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'assets/img/avatar-gollum.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'assets/img/avatar-frodo.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' }
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      }
    ];*/

    //this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  verlogicaRuedaAuxiliar() {
    console.log('rueda:'+this.rueda_auxiliar);


    return this.rueda_auxiliar;
  }
}
