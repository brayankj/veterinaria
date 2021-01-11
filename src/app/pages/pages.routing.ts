import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SettingsUserComponent } from './settings-user/settings-user.component';
import { PetsComponent } from './pets/pets.component';
import { NotesComponent } from './notes/notes.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
    {   path: 'Pets', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [ 
            { path: 'Home', component:  HomeComponent },
            { path: 'Profile', component: SettingsUserComponent, data: { title: 'Mi Perfil' } },
            { path: 'MyPet', component: PetsComponent, data: { title: 'Mis Mascotas' } },
            { path: 'Notes', component: NotesComponent, data: { title: 'Notas Medicas' } },
            { path: 'Search', component: SearchComponent, data: { title: 'Buscando'} },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})

export class PagesRoutingModule { }