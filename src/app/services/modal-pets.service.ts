import { Injectable, EventEmitter } from '@angular/core';
import { Pets } from '../models/pet.model';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class ModalPetsService {

  private _hidenModal: boolean = true;
  private _hidenModalNote: boolean = true;
  public dataModal = new EventEmitter<Pets>();
  public dataModalNote = new EventEmitter<Note>();
  constructor() { }

  get hidenModal(){
    return this._hidenModal;
  }

  get hidenModalNote(){
    return this._hidenModalNote;
  }

  openModal() {
    this._hidenModal = false;
  }

  closeModal(){
    this._hidenModal = true;
  }

  openModalNotes() {
    this._hidenModalNote = false;
  }

  closeModalNotes(){
    this._hidenModalNote = true;
  }
  
}
