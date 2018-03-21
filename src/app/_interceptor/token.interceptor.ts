import {Injectable, Injector, NgModule} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);
    const token = auth.getToken();
    request = request.clone({
      headers: request.headers.append('Authorization', `Bearer ${token}`)
    });
    //console.log('Interceptado!'+this.auth.getToken());
    return next.handle(request);
  }
}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class InterceptorModule { }
