import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { UsersService } from '../../services/users.service';
import { environment } from 'src/environments/environment';

const { baseUrl } = environment;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public keyword: string;
  public users: [] = [];
  public pets: [] = [];
  public notes: [] = [];
  public urlUsers: string = `${baseUrl}/upload/users/`;
  public urlPets: string = `${baseUrl}/upload/pets/`;
  constructor(
    private _route : ActivatedRoute,
    private _user : UsersService,
    public searchService : SearchService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe( params => {
      this.keyword = params['keyword'];
      this.searchAll();
    });
  }

  searchAll(){
    this.searchService.getSearchAll( this.keyword ).subscribe( 
      resp => {
        this.users = resp.users;
        this.pets = resp.pets;
        this.notes = resp.notes;
      }
    )
  }

}
