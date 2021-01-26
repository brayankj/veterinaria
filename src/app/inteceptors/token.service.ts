import { Injectable, NgZone } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  public token;
  constructor(
    private _usersService : UsersService,
    private _router: Router,
    private _ngZone: NgZone,
  ) { 
    this.token = this._usersService.token;
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this._usersService.token;
    let headers;
    if ( this.token ) {
      headers = new HttpHeaders({
        'token': this.token
      });
      const reqClone = req.clone({
        headers
      });
      return next.handle( reqClone ).pipe(
        catchError( this.msgErrors )  
      );
    }else{ 
      headers = new HttpHeaders( {
        'token': ''
      } );
      const reqClone = req.clone({
        headers
      });
      return next.handle( reqClone ).pipe(
        catchError( this.msgErrors )  
      );
    }

  }

  msgErrors( err: HttpErrorResponse ){
    //this._ngZone.run( () => this._router.navigateByUrl('/login'));
    return throwError(' Error en la peticion del componente ');
  }

}
