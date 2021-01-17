import { Component, OnInit, Input } from '@angular/core';
import { PetsService } from '../../services/pets.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Pets } from '../../models/pet.model';
import { ModalPetsService } from '../../services/modal-pets.service';
import { environment } from '../../../environments/environment';

const { baseUrl } = environment;

@Component({
  selector: 'app-card-pet',
  templateUrl: './card-pet.component.html',
  styleUrls: ['./card-pet.component.scss']
})
export class CardPetComponent implements OnInit {

  @Input() Pet:Pets;
  url: string;
  public imageUpload: File;
  public imgTemp: any = null;

  constructor(
    public _petsService : PetsService,
    public _fileUploadService: FileUploadService,
    public _modalPetsService: ModalPetsService,
  ) { 
    this.url = `${baseUrl}/upload/pets/`;
  }

  ngOnInit(): void { 
  }

  changeImage( file: File ){
    this.imageUpload = file;
    if(!file){ return this.imgTemp = null }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  UpdateImage( id:string ){
    if( !id ){ return; }
    this._fileUploadService.updateImage( this.imageUpload, 'pets', id ).then( );
  }

  deletePet( id:string ){
    if( !id ){ return; }
    this._petsService.idPet.emit( id );
  }

  openModal( pet : Pets ){
    this._modalPetsService.openModal();
    this._modalPetsService.dataModal.emit(pet);
  }

  closeModal(){
    this._modalPetsService.closeModal();
  }

}
