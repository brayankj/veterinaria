import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-not-page',
  templateUrl: './not-page.component.html',
  styleUrls: ['./not-page.component.scss']
})
export class NotPageComponent implements OnInit {

  constructor(
    private _router: Router,
    private _usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  returnHome(){
    if( !this._usersService.token ){
      this._router.navigateByUrl('/login');
    }else{
      this._router.navigateByUrl('/Pets/Home');
    }
  }

}
