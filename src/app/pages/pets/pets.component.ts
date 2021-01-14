import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../services/pets.service';
import { UsersService } from '../../services/users.service';
import { Pets } from '../../models/pet.model';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  public myPets: Pets;
  constructor(
    private _petsService: PetsService,
    private _usersService: UsersService
  ) { }

  ngOnInit(): void {
    const idUser = this._usersService.id;
    this._petsService.viewPets(idUser).subscribe( (resp:any) => this.myPets = resp.pets );
  }

}
