import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderAuthComponent } from './header-auth/header-auth.component';
import { FooterAuthComponent } from './footer-auth/footer-auth.component';

@NgModule({
  declarations: [
    HeaderAuthComponent,
    FooterAuthComponent,
  ],
  exports: [
    HeaderAuthComponent,
    FooterAuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
