import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from './inteceptors/token.service';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module'

import { AppComponent } from './app.component';
import { NotPageComponent } from './not-page/not-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NotPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    ComponentsModule,
  ],
  providers: [
    /*{ 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
