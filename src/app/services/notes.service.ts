import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { Form } from '@angular/forms';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Note } from '../models/note.model';
const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    public http: HttpClient,
    private _user :UsersService,
    private _ngZone: NgZone,
    private _router: Router,
  ) { }

  getNotesUser( id: string ){
    return this.http.get( `${ baseUrl }/consultations/myNotes/${ id }`,{
      headers: {
        'token': this._user.token,
      }
    });
  }

  createNote( data: Form ){
    return this.http.post( `${ baseUrl }/consultations`, data ,{
      headers: {
        'token': this._user.token,
      }
    }).pipe( 
      tap( (resp:any) => {
        Swal.fire( { icon: 'success', title: 'Consulta Registrada', text: resp.msg } ),
        this._ngZone.run( () => this._router.navigateByUrl('Pets/Home') )
      }),
      catchError( this.msgErrors ),
    );
  }

  updateNote( note: Note  ){
    console.log(note);
    return this.http.put( `${ baseUrl }/consultations/${note.id}`, note ,{
      headers: {
        'token': this._user.token,
      }
    }).pipe( 
      tap( (resp:any) => {
        Swal.fire( { icon: 'success', title: 'Consulta Actualizada', text: resp.msg } ),
        this._ngZone.run( () => this._router.navigateByUrl('Pets/Home') )
      }),
      catchError( this.msgErrors ),
    );
  }

  deleteNote( id: string ){
    return this.http.delete( `${ baseUrl }/consultations/${ id }`,{
      headers: {
        'token': this._user.token,
      }
    }).pipe(
      tap( (resp:any) =>{
        Swal.fire( { icon: 'success', title: 'Consulta Eliminada', text: resp.msg } ),
        this._ngZone.run( () => this._router.navigateByUrl('Pets/Home') )
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
