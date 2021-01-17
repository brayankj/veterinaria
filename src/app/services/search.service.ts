import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsersService } from '../services/users.service';

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

}
