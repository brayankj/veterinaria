import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { SettingsUserComponent } from './settings-user/settings-user.component';
import { PetsComponent } from './pets/pets.component';
import { NotesComponent } from './notes/notes.component';
import { SearchComponent } from './search/search.component';


const childRoutes: Routes = [
  { path: 'Home', component:  HomeComponent },
  { path: 'Profile', component: SettingsUserComponent, data: { title: 'Mi Perfil' } },
  { path: 'MyPet', component: PetsComponent, data: { title: 'Mis Mascotas' } },
  { path: 'Notes', component: NotesComponent, data: { title: 'Notas Medicas' } },
  { path: 'Search/:keyword', component: SearchComponent, data: { title: 'Buscando'} },
]


@NgModule({
  imports: [
      RouterModule.forChild(childRoutes),
  ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
