import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { UsersService } from '../../services/users.service';
import { NotesService } from '../../services/notes.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const { baseUrl } = environment;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public keyword: string;
  public users: [] = [];
  public pets: [] = [];
  public notes: [] = [];
  public urlUsers: string = `${baseUrl}/upload/users/`;
  public urlPets: string = `${baseUrl}/upload/pets/`;
  public roleUser;
  constructor(
    private _route : ActivatedRoute,
    public user : UsersService,
    public searchService : SearchService,
    private _router : Router,
    private _notesService : NotesService,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe( params => {
      this.keyword = params['keyword'];
      this.searchAll();
    });
    this.roleUser = this.user.role;
  }

  searchAll(){
    this.searchService.getSearchAll( this.keyword ).subscribe( 
      resp => {
        this.users = resp.users;
        this.pets = resp.pets;
        this.notes = resp.notes;
      }
    )
  }

  redirectToNewNote( id: string){
    if( !id ) return;  
    if( this.user.role === "USER_ROLE" ) return;
    this._router.navigate(['Pets/NewNote',id]);
  }

  deleteUser( id: string ){
    if( !id ){ return; }
    if( this.roleUser !== "ADMIN_ROLE" ){ return; }
    Swal.fire({
      title: 'ELIMINAR CUENTA DE USUARIO?',
      text: "Estas seguro(a) que deseas eliminar una cuenta!, esta acción no es reversible y el usuario no podra ingresar de nuevo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.user.deleteOneUser(id);
      }
    });
  }

  deleteNote( id: string ){
    if( !id ){ return; }
    if( this.user.role === "USER_ROLE" ){ return; }
    Swal.fire({
      title: 'ELIMINAR CONSULTA?',
      text: "Estas seguro(a) que deseas eliminar esta consulta!, esta acción no es reversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._notesService.deleteNote(id).subscribe();
      }
    });
  }

  editNote(data){
    console.log(data);
  }

}
