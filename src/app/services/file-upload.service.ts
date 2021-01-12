import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

const { baseUrl } = environment;
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updateImage( file: File, typeCollections: 'users' | 'pets', id: string ){

    try {
      
      const url = `${ baseUrl }/upload/${ typeCollections }/${ id }`;
      const formData = new FormData();
      formData.append( 'image', file );
      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'token': localStorage.getItem('token')
        },
        body: formData
      });
      
      const data = await resp.json();
      if ( data.ok ) {
        Swal.fire( { icon: 'success', title: 'Actualizado', text: data.msg } )
        return data.name;
      }else{ 
        Swal.fire( { icon: 'error', title: 'Opps Error', text: data.msg } )
        return false; 
      }

    } catch (error) {
      return false;
    }
  }

}
