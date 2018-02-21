import 'rxjs/add/operator/do';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/auth.service';
import { Injectable } from '@angular/core';
import {NavController} from "ionic-angular";
import {LoginPage} from "../../pages/login/login";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService,
              public navCtrl: NavController) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        console.log(event);
      }
    }, (err: any) => {
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          if (this.auth.getCurrentUser() != null) {
            this.navCtrl.setRoot(LoginPage, {});
          } else {
            this.navCtrl.setRoot(LoginPage, {});
          }
          console.log('unauthorized');
        }
      }
    });
  }
}
