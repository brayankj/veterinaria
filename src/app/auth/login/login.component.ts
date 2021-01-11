import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public auth2:any;
  @ViewChild('closebutton') closebutton;
  public formloginSubmit = false;
  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || ' ', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    remember: [ false ],
  },{ validators: this.validFormChangues('email') } );

  constructor(
    private fb: FormBuilder,
    private _usersService: UsersService,
  ) { }

  ngOnInit( ): void { 
    this.loginGoogle();
  }

  loginUser(){
    this.formloginSubmit = true;
    if ( this.loginForm.valid ) {
      if(this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value );
      }else{
        localStorage.removeItem('email');
      }
      this._usersService.loginUser( this.loginForm.value ).subscribe( x => { if(x === true) this.closeModal() } );
    }
    return;
  }

  async loginGoogle(){
    await this._usersService.googleInit();
    this.auth2 = this._usersService.auth2;
    this.attachSignin(document.getElementById('MyBottonGoogle'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const token = googleUser.getAuthResponse().id_token;
          this._usersService.loginGoogle( token ).subscribe( x => { if(x === true) this.closeModal() } );
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

  

  public closeModal() {
    this.closebutton.nativeElement.click();
  }

  validateFields( value: string ) : boolean{
    let res: boolean;
    this.loginForm.get( value ).invalid && this.formloginSubmit ? res = true : res = false;
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
