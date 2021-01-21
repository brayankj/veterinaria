import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';

const { baseUrl } = environment;
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http : HttpClient,
    private _user : UsersService,
  ) { }

  getSearch( collection: string ,keyword : string) : Observable<any>{
    return this.http.get( `${ baseUrl }/search/${ collection }/${ keyword }`,{
      headers: {
        'token': this._user.token,
      }
    });
  }

  getSearchAll( keyword: string ){
    return this.http.get(`${ baseUrl }/search/${ keyword }`,{
      headers: {
        'token': this._user.token,
      }
    }).pipe( 
      map( (resp:any) => {
        let { users, pets, notes } = resp;
        if( this._user.user.role === "USER_ROLE" ){
          users = resp.users.filter( medic => medic.role === 'MEDIC_ROLE' && medic.active == true ) 
          notes = [];
        }
        resp.users = users;
        resp.pets = pets;
        resp.notes = notes;
        return resp;
      })
    )
  }

}
