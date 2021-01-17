import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../services/pets.service';
import { UsersService } from '../../services/users.service';
import { Pets } from '../../models/pet.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  public myPets: Pets;
  private idUser;
  constructor(
    private _petsService: PetsService,
    private _usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.idUser = this._usersService.id;
    this._petsService.viewPets(this.idUser).subscribe( (resp:any) => this.myPets = resp.pets );
    this.deletePet();
  }

  deletePet(){
    this._petsService.idPet.subscribe( id => {
      Swal.fire({
        title: 'Eliminar Mascota?',
        text: "Estas seguro(a) que deseas eliminar a tu mascota!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this._petsService.deletePet(id).subscribe( (x:any) => {
            Swal.fire( 'Eliminado!', x.msg, 'success') } ),
            this._petsService.viewPets(this.idUser).subscribe( (resp:any) => this.myPets = resp.pets );
        }
      });
    });
  }

}
