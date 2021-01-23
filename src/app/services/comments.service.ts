import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Comments } from '../models/comment.model';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private http : HttpClient,
    private _user: UsersService,
  ) { }

  getComments(){
    return this.http.get( `${ baseUrl }/comment`,{
      headers: {
        'token': this._user.token,
      }
    }).pipe(  catchError( this.msgErrors ) );
  }

  createComment( comment : Comments ){
    return this.http.post( `${ baseUrl }/comment`, comment ).pipe( 
      tap( () => {
        Swal.fire( { icon: 'success', title: 'Commentario Registrado', text: `Comentario o duda enviado por ${comment.email} registrado, gracias estaremos en contacto.` } )
      }),
      catchError( this.msgErrors ),
    );
  }

  deleteComment( id: string ){
    return this.http.delete( `${ baseUrl }/comment/${id}`,{
      headers: {
        'token': this._user.token,
      }
    } ).pipe( 
      tap( (resp:any) => {
        Swal.fire( { icon: 'success', title: 'Commentario Eliminado', text: resp.msg } )
      }),
      catchError( this.msgErrors ),
    );
  }

  msgErrors( err: HttpErrorResponse ){
    return throwError(
        Swal.fire( { icon: 'error', title: 'Oopss Error ', text: err.error.msg } )
    );
  }

}
