import {Component, Renderer, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

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
  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  callback:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
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
    let data = this.canvasElement.toDataURL();
    this.callback(data).then(()=>{
      this.navCtrl.pop();
    });

    //this.navCtrl.pop();
  }

  lastX: number;
  lastY: number;

  currentColour: string = '#000';

  brushSize: number = 4;


  ngAfterViewInit(){

    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() -8 + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', 300 + '');

  }


  changeSize(size){
    this.brushSize = size;
  }

  handleStart(ev){

    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY-156;
  }

  handleMove(ev){

    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY-156;

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

}
