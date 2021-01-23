import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  public Comments : [] = [];
  constructor(
    public comments : CommentsService,
    private _user : UsersService,
  ) { }

  ngOnInit(): void {
    this.comments.getComments().subscribe( (data:any) => this.Comments = data.comments);
  }

  deleteComment( id : string){
    if( !id ){ return; } 
    if( this._user.role === "ADMIN_ROLE" ){ 
      this.comments.deleteComment(id).subscribe(
        () => this.comments.getComments().subscribe( (data:any) => this.Comments = data.comments)
      );
    }
  }

}
