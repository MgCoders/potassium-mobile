import {Component, Renderer, ViewChild} from '@angular/core';
import {IonicPage, Keyboard, NavController, NavParams, Platform, ToastController} from 'ionic-angular';

/**
 * Generated class for the AltaFirmaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-firma',
  templateUrl: 'alta-firma.html',
})
export class AltaFirmaPage {

  rol: string;
  nombreFirma: string;
  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  callback:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public keyboard: Keyboard,
              public renderer: Renderer,
              private toastCtrl: ToastController) {
    this.rol = this.navParams.get("rol");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaFirmaPage');
    //this.canvasElement = this.canvas.nativeElement;
  }



  lastX: number;
  lastY: number;

  currentColour: string = '#000';

  brushSize: number = 4;


  ngAfterViewInit(){

    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() - (16+5)*2  -2 -1 + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', 300 + '');

  }


  changeSize(size){
    this.brushSize = size;
  }

  handleStart(ev){

    this.lastX = ev.touches[0].pageX-21;
    this.lastY = ev.touches[0].pageY-226;
  }

  handleMove(ev){

    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX-21;
    let currentY = ev.touches[0].pageY-226;

    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = this.currentColour;
    ctx.lineWidth = this.brushSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;

  }

  clearCanvas(){
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  keyboardCheck() {
    //console.log('The keyboard is open:', this.keyboard.isOpen());
    return this.keyboard.isOpen();
  }


  confirmarFirma(){
    console.log("lo exporto");


    if(!this.validarCamposAltaFirma()) {
      return;
    }



    this.callback = this.navParams.get("callback");
    let data = {firma: this.canvasElement.toDataURL(), nombre: this.nombreFirma};
    this.callback(data).then(()=>{
      this.navCtrl.pop();
    });

  }



  validarCamposAltaFirma(){

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";
    console.log("Validando firma: ", this.canvasElement.toDataURL());
    console.log("Validando nombreFirma: ", this.nombreFirma);


    if(valido && (this.canvasElement.toDataURL() == undefined ||this.canvasElement.toDataURL() == '')){
      mensaje = 'No se ingresó firma';
      valido = false;
    }
    if(valido && (this.nombreFirma == undefined || this.nombreFirma == '')){
      mensaje = 'No se ingresó nombre';
      valido = false;
    }


    //Estos campos no requieren validación
    //this.clienteActual.telefono
    //this.clienteActual.direccion

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    return valido;



  }


}
