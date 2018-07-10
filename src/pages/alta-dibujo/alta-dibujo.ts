import {Component, Renderer, ViewChild} from '@angular/core';
import {IonicPage, Keyboard, NavController, NavParams, Platform, ToastController} from 'ionic-angular';

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


  nombreDibujo: string;
  @ViewChild('myCanvas') canvas: any;
  @ViewChild('imgBk') image: any;
  canvasElement: any;
  callback:any;
  background: string = "";
  dibujoEquipoRecepcion: string = "";
  dibujoAncho: number = 0;
  dibujoAlto: number = 0;

  drawingsSteps: any[] = [];
  numberStep: number = 0;

  lastX: number;
  lastY: number;

  currentColour: string = '#000';

  brushSize: number = 4;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public keyboard: Keyboard,
              public renderer: Renderer,
              private toastCtrl: ToastController) {

    //this.background = '../../assets/imgs/Camión_eje_simple_con_tanque.png';

    this.dibujoEquipoRecepcion = navParams.data['dibujoEquipoRecepcion'];
    let bck = navParams.data['backgroundDibujo'];
    if (bck == "Camion"){
      bck = 'assets/imgs/Camión_eje_simple_con_tanque.png';
    }
    if (bck == "Camion"){
      bck = 'assets/imgs/Camión_eje_simple_con_tanque.png';
    }
    if (bck == "Camion"){
      bck = 'assets/imgs/Camión_eje_simple_con_tanque.png';
    }
    this.background = (bck == '') ? 'assets/imgs/Camión_eje_simple_con_tanque.png' : bck;
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
    image.src = this.dibujoEquipoRecepcion;


  }

  changeSize(size){
    this.brushSize = size;
  }

  undoDraw(){

    if (this.numberStep > 0) {
      this.clearCanvas();

      console.log('Entró a la funcion undo!');
      console.log('La lista es: ', this.drawingsSteps);
      console.log('numeroActual: ', this.numberStep);

      this.numberStep--;

      let ctx = this.canvasElement.getContext('2d');

      //Muestro la imagen
      var image = new Image();
      image.onload = function () {
        ctx.drawImage(image, 0, 0);
      };


      image.src = this.drawingsSteps[this.numberStep];
      console.log('Salgo a la funcion undo!');
      console.log('La lista es: ', this.drawingsSteps);
      console.log('numeroActual: ', this.numberStep);
    }

  }


  redoDraw(){

    if (this.numberStep < this.drawingsSteps.length){
      this.clearCanvas();

      console.log('Entró a la funcion redo!');
      console.log('La lista es: ', this.drawingsSteps);
      console.log('numeroActual: ',this.numberStep);


      let ctx = this.canvasElement.getContext('2d');

      //Muestro la imagen
      var image = new Image();
      image.onload = function() {
        ctx.drawImage(image, 0, 0);
      };


      console.log("poslista:",this.numberStep, "elem: ", this.drawingsSteps[this.numberStep]);
      image.src = this.drawingsSteps[this.numberStep];
      this.numberStep++;
      console.log('Salgo a la funcion redo!');
      console.log('La lista es: ', this.drawingsSteps);
      console.log('numeroActual: ', this.numberStep);
    }

  }

  handleStart(ev){

    console.log('Entró a la funcion handle!');
    console.log('La lista es: ', this.drawingsSteps);
    console.log('numeroActual: ', this.numberStep);

    //guardo el elemento para el ctrl+z
    this.drawingsSteps[this.numberStep] = this.canvasElement.toDataURL();

    //limpio el historial hacia adelante, dejando la lista hasta el actual
    this.numberStep++;
    this.drawingsSteps = this.drawingsSteps.slice(0,this.numberStep);
    console.log('Salgo a la funcion handle!');
    console.log('La lista es: ', this.drawingsSteps);
    console.log('numeroActual: ', this.numberStep);

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

    this.dibujoEquipoRecepcion =  this.canvasElement.toDataURL();

    if(!this.validarCamposAltaDibujo()) {
      return;
    }

    console.log(this.canvasElement.toDataURL());


    this.callback = this.navParams.get("callback");
    let data = {dibujoEquipoRecepcion: this.dibujoEquipoRecepcion,
                dibujoAncho: this.dibujoAncho,
                dibujoAlto: this.dibujoAlto};
    this.callback(data).then(()=>{
      this.navCtrl.pop();
    });

  }


  validarCamposAltaDibujo(){

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";
    console.log("Validando dibujoEquipoRecepcion: ", this.dibujoEquipoRecepcion);
    console.log("Validando dibujoAncho: ", this.dibujoAncho);
    console.log("Validando dibujoAlto: ", this.dibujoAlto);



    if(valido && (this.dibujoEquipoRecepcion == undefined || this.dibujoEquipoRecepcion == '')){
      mensaje = 'No se ingresó nada';
      valido = true;
    }
    if(valido && (this.dibujoAncho == undefined || this.dibujoAncho == 0)){
      mensaje = 'Ocurrió un error con el tamaño de la imagen';
      valido = false;
    }
    if(valido && (this.dibujoAlto == undefined || this.dibujoAlto == 0)){
      mensaje = 'Ocurrió un error con el tamaño de la imagen';
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
