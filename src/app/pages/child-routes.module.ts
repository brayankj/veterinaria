import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleGuard } from '../guards/role.guard';

import { HomeComponent } from './home/home.component';
import { SettingsUserComponent } from './settings-user/settings-user.component';
import { PetsComponent } from './pets/pets.component';
import { NotesComponent } from './notes/notes.component';
import { SearchComponent } from './search/search.component';
import { NewConsultationIdComponent } from './new-consultation-id/new-consultation-id.component';
import { CommentsComponent } from './comments/comments.component';


const childRoutes: Routes = [
  { path: 'Home', component:  HomeComponent },
  { path: 'Profile', component: SettingsUserComponent, data: { title: 'Mi Perfil' } },
  { path: 'MyPet', component: PetsComponent, data: { title: 'Mis Mascotas' } },
  { path: 'Notes', component: NotesComponent, data: { title: 'Notas Medicas' } },
  { path: 'Search/:keyword', component: SearchComponent, data: { title: 'Buscando'} },
  { path: 'NewNote/:idPet', canActivate: [ RoleGuard ],  component: NewConsultationIdComponent, data: { title: 'Nueva consulta'} },
  { path: 'Comentarios',canActivate: [ RoleGuard ], component : CommentsComponent, data: { title: 'Comentarios'} },
]


@NgModule({
  imports: [
      RouterModule.forChild(childRoutes),
  ],
  exports: [ RouterModule ],
  declarations: [],
})
export class ChildRoutesModule { }
