import { Injectable } from '@angular/core';
import {
    //Headers,
    //RequestOptions,
    Response
} from '@angular/http';
import {
  HttpParams,
  HttpClient,

} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtHelper } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { Usuario } from '../_models/Usuario';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {

  ret: any;

    private jwt = new JwtHelper();

    constructor(private httpClient: HttpClient) {
    }

    getToken(): string {
        if (this.getCurrentUser()) {
            return this.getCurrentUser().token;
        } else {
            return null;
        }
    }

    public isAuthenticated(): boolean {
        try {
            const token = this.getToken();
            return (token != null) && !this.jwt.isTokenExpired(token);
        } catch (e) {
            return false;
        }
    }

    public isAuthenticatedAndAdmin(): boolean {
        try {
            const token = this.getToken();
            return (token != null) && !this.jwt.isTokenExpired(token) && (this.getCurrentUser() && this.getCurrentUser().role === 'ADMIN');
        } catch (e) {
            return false;
        }
    }

    login(email: string, password: string): Observable<boolean> {

        let p = new HttpParams({
          fromObject: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'email': email,
            'password': password
          }
        });
        const url = `${environment.apiUrl}/auth/login`;
          return this.httpClient.post<Usuario>(url, p)
            .map( (user: Usuario) => {
                // login successful if there's a jwt token in the response
                //const user: Usuario = response.json();
                console.log(user);
                console.log(JSON.stringify(user));

                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    // return true to indicate successful login
                    return true;
                } else {
                    this.handleErrorObservable('Obs en login: Sin error, pero no retornó lo esperado');
                }
            })
            .catch((e: any) => Observable.throw(this.handleErrorObservable(e)));
    }

    /*login(email: string, password: string): Observable<boolean> {
      this.ret = false;

      const url = `${environment.apiUrl}/auth/login`;


      let p = new HttpParams({
        fromObject: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'email': email,
          'password': password
        }
      });


      this.httpClient.post<boolean>(url, p).subscribe((data) => {
        // login successful if there's a jwt token in the response
        var cache = [];
        let jsonData = JSON.stringify(data, function(key, value) {
          if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }
            // Store value in our collection
            cache.push(value);
          }
          return value;}
        );
        //console.log(jsonData);
        let user = new UsuarioImp(JSON.parse(jsonData));

        console.log('tock: '+(user && user.token));

        if (user && user.token) {
          console.log("ok");
          localStorage.setItem('currentUser', JSON.stringify(user));
          // return true to indicate successful login
          return true;

        } else {
          console.log("cagamo");
          return this.handleErrorObservable(data);

        }
      });

    }*/


    resetPassword(email: string) {
        return this.httpClient.post(`${environment.apiUrl}/auth/recuperar/` + email, {});
    }

    resetEmail(token: string): Observable<any> {
        return this.httpClient.get(`${environment.apiUrl}/auth/recuperar/` + token)
            .map((res: Response) => res.json());
    }

    changePassword(token: string, password: string) {
        //const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        //const options = new RequestOptions({headers});
        let p = new HttpParams({
          fromObject: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': token,
            'password': password
          }
        });
        return this.httpClient.put(`${environment.apiUrl}/auth/recuperar/`, p);
    }

    private handleErrorObservable(error: Response | any) {
        return Observable.throw(error.message || error);
    }

    logout(): void {
        localStorage.removeItem('currentUser');
    }

    public getCurrentUser(): Usuario {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

}
