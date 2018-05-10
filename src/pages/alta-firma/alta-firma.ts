import {Component, Renderer, ViewChild} from '@angular/core';
import {IonicPage, Keyboard, NavController, NavParams, Platform} from 'ionic-angular';

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
              public renderer: Renderer) {
    this.rol = this.navParams.get("rol");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaFirmaPage');
    //this.canvasElement = this.canvas.nativeElement;
  }

  confirmarFirma(){
    console.log("lo exporto");

    console.log(this.canvasElement.toDataURL());


    this.callback = this.navParams.get("callback");
    let data = {firma: this.canvasElement.toDataURL(), nombre: this.nombreFirma};
    this.callback(data).then(()=>{
      this.navCtrl.pop();
    });

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


}
