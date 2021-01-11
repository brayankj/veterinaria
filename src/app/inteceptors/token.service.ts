import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from '../services/users.service'
import { User } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  public token;
  constructor(
    private _usersService : UsersService,
  ) { 
    this.token = localStorage.getItem('token');
    console.log(this.token);
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Paso por el inteceptor');

    let headers;
    if (this.token ) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.token
      });
      const reqClone = req.clone({
        headers
      });
      return next.handle( reqClone );
    }else{ 
      headers = new HttpHeaders({ 'Content-Type': 'application/json', token: '' });
      const reqClone = req.clone({
        headers
      });
      return next.handle( reqClone ).pipe(
        catchError( this.msgErrors )
      );
    }

  }

  msgErrors( err: HttpErrorResponse ){
    console.log('sucedio un error');
    console.log(err);
    return throwError(' Error en la peticion del componente ');
  }

}
