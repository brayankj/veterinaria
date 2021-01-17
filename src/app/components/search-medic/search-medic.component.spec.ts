import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMedicComponent } from './search-medic.component';

describe('SearchMedicComponent', () => {
  let component: SearchMedicComponent;
  let fixture: ComponentFixture<SearchMedicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMedicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
