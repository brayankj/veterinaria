import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formSubmit = false;
  public registerForm = this.fb.group({
    names: ['', Validators.required ],
    lastnames: ['', Validators.required ],
    years: [ 0 , Validators.required ],
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    passConfirm: [ '', Validators.required ],
    terms: [ false, [Validators.required, Validators.requiredTrue] ],
  }, {
    validators: this.validFormChangues( 'password', 'passConfirm', 'email' ,'years' ) 
  });

  constructor(
    private fb: FormBuilder,
    private _usersService : UsersService,
  ){ }

  ngOnInit(): void {
  }

  createUser(){
    this.formSubmit = true;
    if( this.registerForm.valid ){
      this._usersService.createUser( this.registerForm.value );
    } 
    return;
  }

  validateFields( value ) : boolean {
    let res: boolean;
    this.registerForm.get( value ).invalid && this.formSubmit ? res = true : res = false;
    return res;
  }

  validateyears( value ) : boolean {
    let res: boolean;
    this.registerForm.get( value ).value < 18 && this.formSubmit ? res = true : res = false;
    return res;
  }

  validateTerms() : boolean {
    return !this.registerForm.get('terms').value && this.formSubmit;
  }

  validateLengthPass( value ): boolean {
    let res: boolean;
    this.registerForm.get( value ).value.length < 8 && this.formSubmit ? res = true : res = false;
    return res;
  }

  validatePasswords() : boolean {
    const password = this.registerForm.get('password').value;
    const passConfirm = this.registerForm.get('passConfirm').value;
    let res: boolean;
    password !== passConfirm && this.formSubmit ? res = true : res = false;
    return res;
  }

  validFormChangues( password: string, passwordConfirm: string, email: string  ,year ){
    return ( formGroup: FormGroup ) => {
      const typeValid = ['gmail.com', 'gmail.es', 'hotmail.com', 'hotmail.es', 'outlook.com', 'outlook.es', 'yahoo.com', 'yahoo.es'];
      const passFirst = formGroup.get(password);
      const passSecond = formGroup.get(passwordConfirm);
      const emailValid = formGroup.get(email);
      const age = formGroup.get(year);
      const extEmail = emailValid.value.split('@');
      passFirst.value === passSecond.value ? passSecond.setErrors(null) : passSecond.setErrors({ noEquals: true });
      age.value > 17 ? age.setErrors(null) : age.setErrors({ notOfLegalAge: true });
      typeValid.includes(extEmail[1]) ? emailValid.setErrors(null) : emailValid.setErrors({ extNotValid: true });
    }
  }
  
}
