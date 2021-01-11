import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Register } from '../interfaces/register.interfaces';
import { Login } from '../interfaces/login.interfaces';
import { User } from '../models/usuario.model';
import { environment } from '../../environments/environment';


const { baseUrl } = environment;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public auth2:any;
  public user: User;
  public token:string;;
  constructor(
    private http: HttpClient,
    private _router: Router,
    private _ngZone: NgZone,
  ) { this.googleInit()  }

  googleInit(){
    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: "84016102986-p180fs8cf2p27bak48hkmpvg3b70jqfq.apps.googleusercontent.com",
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
      
    } );
  }

  validateToken(){
    const token = localStorage.getItem( 'token' );
    return this.http.get( `${baseUrl}/auth/newToken`, {
      headers: {
        'token': token
      }
    } ).pipe(
      map( (res: any) => {
        const { names, email, lastnames, active, years, image, google, role, id } = res.user;
        this.user = new User(names, email, '', lastnames, active, years, image, google, role, id);
        localStorage.setItem('token', res.token);
        return true;
      }),
      catchError( error => of(false) ),
    )
  }

  loginUser( dataForm : Login ){
    return this.http.post( `${baseUrl}/auth`, dataForm ).pipe(
      map( (res:any) =>{
        localStorage.setItem('token', res.token );
        this._ngZone.run( () => this._router.navigateByUrl('/Pets/Home') );
        return true;
      })
    );
  }

  loginGoogle( token: string ){
    return this.http.post( `${baseUrl}/auth/google`, {token} ).pipe(
      map( (res:any) =>{
        localStorage.setItem('token', res.token );
        this._ngZone.run( () => this._router.navigateByUrl('/Pets/Home') );
        return true;
      })
    );
  }

  createUser( registerData : Register ) {
    return this.http.post( `${baseUrl}/users`, registerData )
      .pipe( 
        map( (res:any) => {
          localStorage.setItem('token', res.token );
          this._ngZone.run( () => this._router.navigateByUrl('/Pets/Home') );
        } ),
        catchError( this.msgErrors ),
      ).subscribe();
  }

  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {
      this._ngZone.run( () => this._router.navigateByUrl('/login'));
    })
  }

  msgErrors( err: HttpErrorResponse ){
    return throwError(
        Swal.fire( { icon: 'error', title: 'Oopss Error ', text: err.error.msg } )
    );
  }

}
