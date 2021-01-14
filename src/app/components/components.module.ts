import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardPetComponent } from './card-pet/card-pet.component';
import { ModalFormPetComponent } from './modal-form-pet/modal-form-pet.component'

@NgModule({
  declarations: [
    CardPetComponent,
    ModalFormPetComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CardPetComponent,
    ModalFormPetComponent
  ]
})
export class ComponentsModule { }
