import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/usuario.model';

@Component({
  selector: 'app-top-ofthe-menu',
  templateUrl: './top-ofthe-menu.component.html',
  styleUrls: ['./top-ofthe-menu.component.scss']
})
export class TopOftheMenuComponent implements OnInit {

  public user : User;
  constructor(
    private _usersService : UsersService,
  ) { 
    this.user = _usersService.user;
  }

  ngOnInit(): void { }

  logout(){
    this._usersService.logout();
  }

}
