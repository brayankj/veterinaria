import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html',
  styleUrls: ['./settings-user.component.scss']
})
export class SettingsUserComponent implements OnInit {

  public perfilForm: FormGroup;
  public user : User;
  public imageUpload: File;
  public imgTemp: any = null;
  constructor(
    private fb: FormBuilder,
    private _usersService : UsersService,
    private _fileUploadService: FileUploadService
  ) {  
    this.user = this._usersService.user 
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      names: [ this.user.names , Validators.required ],
      lastnames: [ this.user.lastnames , Validators.required ],
      years: [ this.user.years , Validators.required ],
      email: [ this.user.email , [Validators.required, Validators.email] ],
    },{ validators: this.validFormChangues('email') } );
  }

  updateUser(){
    if(this.user.google){
      Swal.fire( { icon: 'error', title: 'Oopss Error ', text: 'Usuarios registrados con cuentas de google no pueden ser modificdas' } );
      return;
    }
    if(this.perfilForm.valid){
      this._usersService.updateUser(this.perfilForm.value).subscribe(
        (resp:any) => {
          const { names, email } = resp.users;
          this.user.names = names;
          this.user.email = email;
          Swal.fire( { icon: 'success', text: resp.msg } )
        }
      );
    }
    return;
  }

  changeImage( file: File ){
    if(this.user.google === true){
      Swal.fire( { icon: 'error', title: 'Oopss Error ', text: 'Usuarios registrados con cuentas de google no pueden ser modificdas' } );
      return;
    }
    this.imageUpload = file;

    if(!file){ return this.imgTemp = null }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  UpdateImage(){
    this._fileUploadService.updateImage( this.imageUpload, 'users', this.user.id )
      .then( img => this.user.image = img );
  }

  validateFields( value ) : boolean {
    let res: boolean;
    this.perfilForm.get( value ).invalid && this.updateUser ? res = true : res = false;
    return res;
  }

  validFormChangues( email: string ){
    return ( formGroup: FormGroup ) => {
      const typeValid = ['gmail.com', 'gmail.es', 'hotmail.com', 'hotmail.es', 'outlook.com', 'outlook.es', 'yahoo.com', 'yahoo.es'];
      const emailValid = formGroup.get(email);
      const extEmail = emailValid.value.split('@');
      typeValid.includes(extEmail[1]) ? emailValid.setErrors(null) : emailValid.setErrors({ extNotValid: true });
    }
  }

}
