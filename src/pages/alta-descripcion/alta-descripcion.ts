import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
              private camera: Camera) {
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
    this.callback = this.navParams.get("callback");

    let data = {img: this.image, descr: this.descr};
    this.callback(data).then(()=>{
      this.navCtrl.pop();
    });
  }

}
