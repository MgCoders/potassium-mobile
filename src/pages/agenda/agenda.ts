import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, Events} from 'ionic-angular';
import {AltaClientePage} from "../alta-cliente/alta-cliente";
import {ClienteImp} from "../../app/_models/ClienteImp";
import {Cliente} from "../../app/_models/Cliente";
import {ClienteServices} from "../../app/_services/cliente.services";
import { ToastController } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import {Trabajo} from "../../app/_models/Trabajo";
import {AltaRegistroPage} from "../alta-registro/alta-registro";
import {RegistroService} from "../../app/_services/registro.service";
import {RegistroImp} from "../../app/_models/RegistroImp";
import {Registro} from "../../app/_models/Registro";
import {TareaService} from "../../app/_services/tarea.service";
import {Tarea} from "../../app/_models/Tarea";
import {TareaImp} from "../../app/_models/TareaImp";
import {TrabajoService} from "../../app/_services/trabajo.service";
import {TrabajoImp} from "../../app/_models/TrabajoImp";
import {VerTrabajoPage} from "../ver-trabajo/ver-trabajo";


/**
 * Generated class for the ListaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-registro',
  templateUrl: 'agenda.html',

})





export class AgendaPage {

  lista: Trabajo[];
  percentColors: any;

  public trabajoActual: Trabajo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private registroService: RegistroService,
              private tareaService: TareaService,
              private trabajoService: TrabajoService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {



    this.percentColors = [
      { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
      { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
      { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];


  }



  ionViewDidLoad(){
    //this.filterText = "";
  }


  ionViewWillEnter() {

    //Limpio la lista
    this.lista = [];

    //inicializo los helers que voy a usar (Dialogo de cargando y toast'es)
    let loading_lr = this.loadingCtrl.create({
      content: 'Cargando la lista de registros...'
    });
    let toastCorrecto_lr = this.toastCtrl.create({
      message: 'Lista cargada correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    let toastError_lr = this.toastCtrl.create({
      message: 'Error al obtener la lista de registros..',
      duration: 3000,
      position: 'bottom'
    });


    loading_lr.present();


    this.trabajoService.getByEstado("EN_PROCESO").subscribe(
      (data) => {
        data.forEach(tr => {
          let trab = new TrabajoImp(tr);
          console.log("Inserto el registro:", trab);
          this.lista.push( trab );
        });

        loading_lr.dismissAll();
        console.log("Lista registros Actualizada:", this.lista);
      },
      (error) => {
        toastError_lr.setMessage(error);
        loading_lr.dismissAll();
      }
    );

  }

  verFichaTrabajo(id: number){
    this.navCtrl.push(VerTrabajoPage, {id:id});
  }




  getColorForPercentage(pct: number) {
    /*let i = 1;
    for ( let index = 1; i < this.percentColors.length - 1; i++) {
      if (pct < this.percentColors[i].pct) {
        i = index;
        break;
      }
    }
    let lower = this.percentColors[i - 1];
    let upper = this.percentColors[i];
    let range = upper.pct - lower.pct;
    let rangePct = (pct - lower.pct) / range;
    let pctLower = 1 - rangePct;
    let pctUpper = rangePct;
    let color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // or output as hex if preferred

    */
    pct = 100 -pct; //el contrario
    pct /=100;
    let hue=((1-pct)*120);
    let color = ["hsl(",hue,",100%,50%)"].join("");
    let hex = this.hslToRgb(hue,100,50);
    console.log("pct",pct, "pct", color, "hex", hex, "hue", hue);
    return hex;
  }

  hslToRgb(h:number, s:number, l:number){
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    var comun = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    //var invertido = this.invertColor(comun);
    return comun;
  }

  invertColor(hex) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  float2color( percentage ) {
    var color_part_dec = 255 * percentage;
    var color_part_hex = Number(parseInt( color_part_dec , 10)).toString(16);
    return "#" + color_part_hex + color_part_hex + color_part_hex;
  }


}
