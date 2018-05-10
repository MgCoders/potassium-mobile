import {Component, Renderer, ViewChild} from '@angular/core';
import {IonicPage, Keyboard, NavController, NavParams, Platform} from 'ionic-angular';

/**
 * Generated class for the AltaDibujoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-dibujo',
  templateUrl: 'alta-dibujo.html',
})
export class AltaDibujoPage {

  rol: string;
  nombreDibujo: string;
  @ViewChild('myCanvas') canvas: any;
  @ViewChild('imgBk') image: any;
  canvasElement: any;
  callback:any;
  background: string = "";
  dibujo: string = "";
  dibujoAncho: number = 0;
  dibujoAlto: number = 0;

  lastX: number;
  lastY: number;

  currentColour: string = '#000';

  brushSize: number = 4;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public keyboard: Keyboard,
              public renderer: Renderer) {
    this.rol = this.navParams.get("rol");
    this.background = '../../assets/imgs/auto.png';

    this.dibujo = navParams.data['dibujo'];
    this.dibujoAncho = navParams.data['dibujoAncho'];
    this.dibujoAlto = navParams.data['dibujoAlto'];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaDibujoPage');
    //this.canvasElement = this.canvas.nativeElement;
  }



  ngAfterViewInit(){

    this.canvasElement = this.canvas.nativeElement;
    let ctx = this.canvasElement.getContext('2d');


    //si no hay nada seteado, lo seteo en la máquina
    if (!(this.dibujoAlto !=undefined && this.dibujoAncho !=undefined
        && this.dibujoAlto > 0 && this.dibujoAncho > 0 )) {
      this.dibujoAncho = this.platform.width() - (16+5)*2  -2 -1;
      this.dibujoAlto = 300;
    }

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.dibujoAncho.toString());
    this.renderer.setElementAttribute(this.canvasElement, 'height',  this.dibujoAlto.toString());

    //Muestro la imagen
    var image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
    };
    image.src = this.dibujo;

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



  confirmarDibujo(){
    console.log("lo exporto");

    console.log(this.canvasElement.toDataURL());


    this.callback = this.navParams.get("callback");
    let data = {dibujo: this.canvasElement.toDataURL(),
                dibujoAncho: this.dibujoAncho,
                dibujoAlto: this.dibujoAlto};
    this.callback(data).then(()=>{
      this.navCtrl.pop();
    });

  }

}
