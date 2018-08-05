import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ImagePicker} from "@ionic-native/image-picker";

/**
 * Generated class for the AltaDescripcionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alta-descripcion',
  templateUrl: 'alta-descripcion.html',
})
export class AltaDescripcionPage {

  image: string = 'assets/imgs/photo.jpg';
  descr: string = null;

  callback:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private imagePicker: ImagePicker,
              private toastCtrl: ToastController) {
    this.image = 'assets/imgs/photo.jpg';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltaDescripcionPage');
  }


  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      //quality: 100,
      correctOrientation: true
    };

    this.camera.getPicture( options )
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
      })
      .catch(error =>{
        console.error( error );
      });
  }


  guardarDetalle(){

    if(!this.validarCamposAltaDescripcion()) {
      return;
    }

    this.callback = this.navParams.get("callback");

    let data = {img: this.image, descr: this.descr};
    this.callback(data).then(()=>{
      this.navCtrl.pop();
    });
  }




  validarCamposAltaDescripcion(){

    let toastError_ck = this.toastCtrl.create({
      message: 'Error en los campos!',
      duration: 3000,
      position: 'bottom'
    });

    //campos NotNull

    let valido = true;
    let mensaje = "";
    console.log("Validando image: ", this.image);
    console.log("Validando descr: ", this.descr);


    if(valido && (this.image == undefined || this.image == 'assets/imgs/photo.jpg')){
      mensaje = 'Debe tomar una foto';
      valido = false;
    }
    if(valido && (this.descr == undefined || this.descr == '')){
      mensaje = 'Ingrese una descripción de la foto';
      valido = false;
    }


    //Estos campos no requieren validación
    //this.clienteActual.telefono
    //this.clienteActual.direccion

    toastError_ck.setMessage(mensaje);
    toastError_ck.present();

    return valido;



  }





  getPics() {/*
  this.imagePicker.getPictures(
    function (result) {
      var content = '';
      for (var i = 0; i < result.length; i++) {
        content += '<img src="' + result[i] + '" style="max-width:200px"/>';
        //content += '<img src="data:image/jpg;base64,'+result[i]+'" style="max-width:200px"/>';
      }
      document.getElementById("imageOutput").innerHTML = content;
    }, function (error) {
      alert('Error: ' + error);
    }, {
      // if no title is passed, the plugin should use a sane default (preferrably the same as it was, so check the old one.. there are screenshots in the marketplace doc)
      maximumImagesCount: 10,
      title: 'Select pix',
      message: 'Pick max 10 items', // optional default no helper message above the picker UI
      // be careful with these options as they require additional processing
      width: 400,
      quality: 80
      //             outputType: imagePicker.OutputType.BASE64_STRING
    }
  );*/

    this.imagePicker.getPictures(

      {

      }


    ).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });

  }

}
