import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardPetComponent } from './card-pet/card-pet.component';
import { ModalFormPetComponent } from './modal-form-pet/modal-form-pet.component';
import { SearchMedicComponent } from './search-medic/search-medic.component';
import { ModalFormNoteComponent } from './modal-form-note/modal-form-note.component'

@NgModule({
  declarations: [
    CardPetComponent,
    ModalFormPetComponent,
    SearchMedicComponent,
    ModalFormNoteComponent,
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
    ModalFormNoteComponent,
  ]
})
export class ComponentsModule { }
