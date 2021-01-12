import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../services/pets.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  constructor(
    private _petsService: PetsService
  ) { }

  ngOnInit(): void {
    this._petsService.viewPet('5ffccbb23584f475136796bf').subscribe( x => console.log(x) );
  }

}
