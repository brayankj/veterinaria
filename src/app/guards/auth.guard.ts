import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { UsersService } from '../services/users.service';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private _usersService : UsersService,
    private _router : Router,
    private _ngZone: NgZone,
  ){}

  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

    return this._usersService.validateToken().pipe( 
      tap( isAuthent => {
        if(!isAuthent) { 
          this._ngZone.run( () => this._router.navigateByUrl('/login'));
         }
      }),
      catchError( this.msgErrors ),
  );

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this._usersService.validateToken().pipe( 
        tap( isAuthent => {
          if(!isAuthent) { 
            this._ngZone.run( () => this._router.navigateByUrl('/login'));
           }
        }),
        catchError( this.msgErrors ),
    );
  }

  msgErrors( err: HttpErrorResponse ){
    return throwError(
      Swal.fire( { icon: 'error', title: 'Oopss Error ', text: err.error.msg } )
    );
  }
  
}
