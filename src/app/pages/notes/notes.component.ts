import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public Notes: [] = [];
  constructor(
    private _user: UsersService,
    public notesService : NotesService
  ) { }

  ngOnInit(): void {
    this.notesService.getNotesUser(this._user.id).subscribe( (data:any) => this.Notes = data.notes );
  }

}
