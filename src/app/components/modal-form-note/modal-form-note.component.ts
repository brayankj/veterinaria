import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { UsersService } from '../../services/users.service';
import { ModalPetsService } from '../../services/modal-pets.service';

@Component({
  selector: 'app-modal-form-note',
  templateUrl: './modal-form-note.component.html',
  styleUrls: ['./modal-form-note.component.scss']
})
export class ModalFormNoteComponent implements OnInit {

  public noteFormUpdte = this.fb.group({
    notes: [ '' , Validators.required ],
    treatment: [ '', Validators.required ],
    nextappointment: [ '' , Validators.required ],
    price: [ '', Validators.required ],
    PaidOut: [ '' ],
    idPet: [ '', Validators.required ],
    idVeterinary: [ '', Validators.required ],
  } );
  public upNote;
  constructor(
    public fb: FormBuilder, 
    public notesService: NotesService,
    public modalPetsService : ModalPetsService,
    private _user : UsersService,
  ) { }

  ngOnInit(): void {
    this.modalPetsService.dataModalNote.subscribe( note => {
      this.upNote = note;
      this.noteFormUpdte.controls['notes'].setValue(this.upNote.notes);
      this.noteFormUpdte.controls['treatment'].setValue(this.upNote.treatment);
      this.noteFormUpdte.controls['nextappointment'].setValue(this.upNote.nextappointment);
      this.noteFormUpdte.controls['price'].setValue(this.upNote.price);
      this.noteFormUpdte.controls['PaidOut'].setValue(this.upNote.PaidOut);
      this.noteFormUpdte.controls['idPet'].setValue(this.upNote.pet._id);
      this.noteFormUpdte.controls['idVeterinary'].setValue(this.upNote.veterinary._id);
    } );
  }

  closeModal(){
    this.modalPetsService.closeModalNotes();
  }

  updateNote(){
    if( this._user.role === "USER_ROLE" ){ return; }
    if( this.noteFormUpdte.valid ){
      const { notes, treatment, nextappointment, price, PaidOut, idPet, idVeterinary } = this.noteFormUpdte.value;
      this.upNote.notes = notes;
      this.upNote.treatment = treatment;
      this.upNote.nextappointment = nextappointment;
      this.upNote.price = price;
      this.upNote.PaidOut = PaidOut;
      this.upNote.pet = idPet;
      this.upNote.veterinary = idVeterinary;
      this.notesService.updateNote( this.upNote ).subscribe( () => this.modalPetsService.closeModalNotes() );
    }
    return;
  }

  validateFields( value ){
    let res: boolean;
    this.noteFormUpdte.get( value ).invalid && this.noteFormUpdte ? res = true : res = false;
    return res;
  }

}
