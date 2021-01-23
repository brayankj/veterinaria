import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { NotesService } from '../../services/notes.service';
import { PetsService } from '../../services/pets.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
const { baseUrl } = environment;

@Component({
  selector: 'app-new-consultation-id',
  templateUrl: './new-consultation-id.component.html',
  styleUrls: ['./new-consultation-id.component.scss']
})
export class NewConsultationIdComponent implements OnInit {

  public noteForm: FormGroup;
  public urlPet: string = `${baseUrl}/upload/pets/`;
  public pet;
  constructor(
    private fb: FormBuilder,
    private _user : UsersService,
    public petService : PetsService,
    private _route : ActivatedRoute,
    private _notesService: NotesService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe( params => {
      const id = params['idPet'];
      this.petService.getPet(id).subscribe( (data:any) => {
        this.pet = data.pets;
        this.noteForm.controls['owner'].setValue(this.pet.owner._id);
      });
      this.form(id);
    });
  }

  form( idPet: string ){
    this.noteForm = this.fb.group({
      veterinary: [ this._user.id , Validators.required ],
      pet: [ idPet , Validators.required ],
      owner: [ idPet , Validators.required ],
      notes: [ '' , Validators.required ],
      treatment: [ '' , Validators.required ],
      nextappointment: [ '' , Validators.required ],
      price: [ '' , Validators.required ],
      PaidOut: [ false ],
      day: [ ''],
    });
  }

  validateFields( value ) : boolean{
    let res: boolean;
    this.noteForm.get( value ).invalid && this.createNote ? res = true : res = false;
    return res;
  }

  createNote( ){
    if( this.noteForm.get('price').value < 100 ){ 
      Swal.fire( { icon: 'error', title: 'Oopss Error ', text: 'El precio no es un monto valido' } );
      return;
     }
    if (this.noteForm.valid) {
      this._notesService.createNote(this.noteForm.value).subscribe()
    }
  }

  redirecToHome(){
    this._router.navigateByUrl('/Pets/Home');
  }

}

