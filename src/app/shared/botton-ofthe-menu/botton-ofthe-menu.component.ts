import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-botton-ofthe-menu',
  templateUrl: './botton-ofthe-menu.component.html',
  styleUrls: ['./botton-ofthe-menu.component.scss']
})
export class BottonOftheMenuComponent implements OnInit {

  constructor(
    private _usersService : UsersService,
  ) { }

  ngOnInit(): void {}


}
