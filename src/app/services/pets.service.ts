import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(
    private http: HttpClient,
  ) { }

  viewPet( id : string){
    return this.http.get( `${ baseUrl }/pets/${ id }`);
  }

}
