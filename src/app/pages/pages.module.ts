import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SettingsUserComponent } from './settings-user/settings-user.component';
import { SearchComponent } from './search/search.component';
import { PetsComponent } from './pets/pets.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    SettingsUserComponent,
    SearchComponent,
    PetsComponent,
    NotesComponent
  ],
  exports: [
    PagesComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
  ]
})
export class PagesModule { }
