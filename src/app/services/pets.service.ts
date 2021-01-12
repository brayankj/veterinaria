import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { UsersService } from './users.service';
import { environment } from '../../environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(
    private http: HttpClient,
    private _usersService : UsersService,
  ) { }

  viewPet( id : string){
    return this.http.get( `${ baseUrl }/pets/mypets/${ id }`,{
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
