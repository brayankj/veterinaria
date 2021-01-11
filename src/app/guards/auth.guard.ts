import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _usersService : UsersService,
    private router : Router,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      console.log('paso por el canActive del guard');
    return this._usersService.validateToken().pipe( 
        tap( isAuthent => {
          if(!isAuthent) { this.router.navigateByUrl('/login'); }
        }), 
    );
  }
  
}
