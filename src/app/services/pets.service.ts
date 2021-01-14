import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { UsersService } from './users.service';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Pets } from '../models/pet.model';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(
    private http: HttpClient,
    private _usersService : UsersService,
  ) { }

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
      tap( x => console.log('data en tap: ', x) ),
      catchError( this.msgErrors ),
    );
  }

  msgErrors( err: HttpErrorResponse ){
    return throwError(
        Swal.fire( { icon: 'error', title: 'Oopss Error ', text: err.error.msg } )
    );
  }

}
