import { Injectable, EventEmitter } from '@angular/core';
import { Pets } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class ModalPetsService {

  private _hidenModal: boolean = true;
  public dataModal = new EventEmitter<Pets>();
  constructor() { }

  get hidenModal(){
    return this._hidenModal;
  }

  openModal() {
    this._hidenModal = false;
  }

  closeModal(){
    this._hidenModal = true;
  }
  
}
