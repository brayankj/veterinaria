import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-footer-auth',
  templateUrl: './footer-auth.component.html',
  styleUrls: ['./footer-auth.component.scss']
})
export class FooterAuthComponent implements OnInit {

  public formCommentSubmit = false;
  public commentForm = this.fb.group({
    email: [  ' ', [ Validators.required, Validators.email ] ],
    comment: [ '', Validators.required ],
  },{ validators: this.validFormChangues('email') } );
  constructor(
    private fb: FormBuilder,
    private _commentsService : CommentsService,
  ) { }

  ngOnInit(): void {
  }

  commentSubmit(){
    this.formCommentSubmit = true;
    if( this.commentForm.valid ){
      this._commentsService.createComment(this.commentForm.value).subscribe();
    }
  }

  validateFields( value: string ) : boolean{
    let res: boolean;
    this.commentForm.get( value ).invalid && this.formCommentSubmit ? res = true : res = false;
    return res;
  }

  validFormChangues( email: string ){
    return ( formGroup: FormGroup ) => {
      const typeValid = [ 'gmail.com', 'gmail.es', 'hotmail.com', 'hotmail.es', 'outlook.com', 'outlook.es', 'yahoo.com', 'yahoo.es' ];
      const emailValid = formGroup.get(email);
      const extEmail = emailValid.value.split('@');
      typeValid.includes(extEmail[1]) ? emailValid.setErrors(null) : emailValid.setErrors( { extNotValid: true } );
    }
  }

}
