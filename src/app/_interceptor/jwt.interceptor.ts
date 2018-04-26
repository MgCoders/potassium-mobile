import 'rxjs/add/operator/do';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {Events, NavController, ToastController} from "ionic-angular";
import {LoginPage} from "../../pages/login/login";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
              public navCtrl: NavController,
              public events: Events,
              private toastCtrl: ToastController,) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let toastError = this.toastCtrl.create({
      message: 'Error al cargar datos..',
      duration: 3000,
      position: 'bottom'
    });

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        console.log(event);
      }
    }, (err: any) => {
      console.log(err);
      if (err.status === 401) {
        console.log('catch response!!! --> error 401 no token!');
        this.navCtrl.setRoot(LoginPage, {});
        console.log('unauthorized');
        this.events.publish('user:logout');
        toastError.setMessage("Es necesario iniciar sesión para continuar..");
        toastError.present();
      }
    });
  }
}
