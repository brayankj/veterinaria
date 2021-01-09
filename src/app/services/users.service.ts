import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Register } from '../interfaces/register.interfaces';
import { environment } from '../../environments/environment';


const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _ngZone: NgZone,
  ) { }

  createUser( registerData : Register ) {
    return this.http.post( `${baseUrl}/users`, registerData )
      .pipe( 
        map( (res:any) => {
          localStorage.setItem('token', res.token );
          this._ngZone.run( () => this._router.navigateByUrl('/home') );
        } ),
        catchError( this.msgErrors ),
      ).subscribe();
  }

  msgErrors( err: HttpErrorResponse ){
    return throwError(
        Swal.fire( { icon: 'error', title: 'Oopss Error ', text: err.error.msg } )
    );
  }

}
