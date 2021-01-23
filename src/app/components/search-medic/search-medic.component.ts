import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, map, filter } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

import { environment } from '../../../environments/environment';
const { baseUrl } = environment;

@Component({
  selector: 'app-search-medic',
  templateUrl: './search-medic.component.html',
  styleUrls: ['./search-medic.component.scss']
})
export class SearchMedicComponent implements OnInit {

  public search: FormControl;
  public doctors = [];
  public url = `${baseUrl}/upload/users/`;
  constructor(
    public searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.search = new FormControl( '', [Validators.required] );
    this.search.valueChanges.pipe( debounceTime(400) ).subscribe( keyword => this.Search( keyword ) );
  }

  Search( keyword:string ){
    keyword = keyword.trim();
    if( keyword.length > 1 ){ 
      this.searchService.getSearch( 'users', keyword ).pipe(  
        map( resp => resp.resultado.filter( medic => medic.role === 'MEDIC_ROLE' && medic.active == true ) )  
      ).subscribe( resp => this.doctors = resp );
    }
    return;
  }

}
