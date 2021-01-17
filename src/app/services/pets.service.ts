import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { UsersService } from './users.service';
import { environment } from '../../environments/environment';
import { Pets } from '../models/pet.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  public idPet = new EventEmitter<String>();
  constructor(
    private http: HttpClient,
    private _usersService : UsersService,
    private _router: Router,
    private _ngZone: NgZone,
  ) { }

    createPet( data : FormGroup ){
      return this.http.post( `${ baseUrl }/pets`, data ,{
        headers: {
          'token': this._usersService.token,
        }
      }).pipe(
        tap( () => this._ngZone.run( () => this._router.navigateByUrl('Pets/MyPet') ) ),
        catchError( this.msgErrors ),
      );
    }

  viewPets( id : string){
    return this.http.get( `${ baseUrl }/pets/mypets/${ id }`,{
      headers: {
        'token': this._usersService.token,
      }
    });
  }

  getPet( id: string ){
    return this.http.get( `${ baseUrl }/pets/${ id }`,{
      headers: {
        'token': this._usersService.token,
      }
    });
  }

  updatePet( pet : Pets ){
    return this.http.put( `${ baseUrl }/pets/${ pet.id }`, pet ,{
      headers: {
        'token': this._usersService.token,
      }
    }).pipe(
      catchError( this.msgErrors ),
    );
  }

  deletePet( id: string ){
    return this.http.delete( `${ baseUrl }/pets/${ id }`,{
      headers: {
        'token': this._usersService.token,
      }
    });
  }

  msgErrors( err: HttpErrorResponse ){
    return throwError(
        Swal.fire( { icon: 'error', title: 'Oopss Error ', text: err.error.msg } )
    );
  }

}
