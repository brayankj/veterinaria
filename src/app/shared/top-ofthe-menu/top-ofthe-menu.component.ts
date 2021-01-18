import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../models/usuario.model';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-ofthe-menu',
  templateUrl: './top-ofthe-menu.component.html',
  styleUrls: ['./top-ofthe-menu.component.scss']
})
export class TopOftheMenuComponent implements OnInit {

  public user : User;
  public searchAll: FormControl;
  constructor(
    private _usersService : UsersService,
    private _router : Router,
  ) { 
    this.user = _usersService.user;
  }

  ngOnInit(): void { 
    this.searchAll = new FormControl( '', [ Validators.required ] );
    this.searchAll.valueChanges.pipe( debounceTime(400) ).subscribe( keyword => this.redirectToSeachPage( keyword ) );
  }

  logout(){
    this._usersService.logout();
  }

  redirectToSeachPage( keyword: string){
    keyword = keyword.trim();
    if( keyword.length > 0 && this.searchAll.valid ) this._router.navigate(['Pets/Search',keyword]);
  }

}
