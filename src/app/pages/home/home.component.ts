import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PetsService } from '../../services/pets.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user : User;
  public newpetForm = this.fb.group({
    typePet: [ '', Validators.required ],
    name: [ '', Validators.required ],
    years: [ '', Validators.required ],
    owner: [ this._user.id , Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    public _user : UsersService,
    private _pets: PetsService,
  ) { }

  ngOnInit(): void {
    this.user = this._user.user;
  }

  cretePet(){
    if( this.newpetForm.valid ){
      this._pets.createPet( this.newpetForm.value ).subscribe( 
        (resp:any) => Swal.fire( { icon: 'success', title: 'Nueva mascota', text: resp.msg } )
      );
    }
    
  }

}
