import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalPetsService } from '../../services/modal-pets.service';
import { PetsService } from '../../services/pets.service';
import { Pets } from '../../models/pet.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-form-pet',
  templateUrl: './modal-form-pet.component.html',
  styleUrls: ['./modal-form-pet.component.scss']
})
export class ModalFormPetComponent implements OnInit {
  
  public petForm = this.fb.group({
    typePet: [ '' , Validators.required ],
    name: [ '', Validators.required ],
    years: [ '' , Validators.required ],
    description: [ '' ]
  } );
  public newPet : Pets;
  constructor(
    public fb: FormBuilder, 
    public _modalPetsService: ModalPetsService,
    public _petsService: PetsService
  ) { }

  ngOnInit(): void {
    this._modalPetsService.dataModal.subscribe( pet => {
      this.newPet = pet;
      this.petForm.controls['typePet'].setValue(pet.typePet);
      this.petForm.controls['name'].setValue(pet.name);
      this.petForm.controls['years'].setValue(pet.years);
      this.petForm.controls['description'].setValue(pet.description);
    });
  }


  cerrarModal(){
    this._modalPetsService.closeModal();
  }

  validateFields( value ) : boolean {
    let res: boolean;
    this.petForm.get( value ).invalid && this.updatePet ? res = true : res = false;
    return res;
  }

  updatePet(){
    const year = this.petForm.get('years').value;
    if( year < 1 || year > 30 ){ 
      return  Swal.fire( { icon: 'error', title: 'Oopss Error ', text: 'Edad no valida' } ); 
    }
    if( this.petForm.valid ){
      const { years, name, description, typePet }  = this.petForm.value;
      this.newPet.name = name;
      this.newPet.typePet = typePet;
      this.newPet.years = years;
      this.newPet.description = description;
      this._petsService.updatePet(this.newPet).subscribe( (resp:any) => {
        Swal.fire( { icon: 'success', text: resp.msg } );
        this._modalPetsService.closeModal();
      }
      );
    }
    return;
  }
  

}
