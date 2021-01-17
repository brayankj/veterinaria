import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardPetComponent } from './card-pet/card-pet.component';
import { ModalFormPetComponent } from './modal-form-pet/modal-form-pet.component';
import { SearchMedicComponent } from './search-medic/search-medic.component'

@NgModule({
  declarations: [
    CardPetComponent,
    ModalFormPetComponent,
    SearchMedicComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CardPetComponent,
    ModalFormPetComponent,
    SearchMedicComponent,
  ]
})
export class ComponentsModule { }
