import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderAuthComponent } from './header-auth/header-auth.component';
import { FooterAuthComponent } from './footer-auth/footer-auth.component';
import { TopOftheMenuComponent } from './top-ofthe-menu/top-ofthe-menu.component';
import { BottonOftheMenuComponent } from './botton-ofthe-menu/botton-ofthe-menu.component';

@NgModule({
  declarations: [
    HeaderAuthComponent,
    FooterAuthComponent,
    TopOftheMenuComponent,
    BottonOftheMenuComponent,
  ],
  exports: [
    HeaderAuthComponent,
    FooterAuthComponent,
    TopOftheMenuComponent,
    BottonOftheMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
