import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormPetComponent } from './modal-form-pet.component';

describe('ModalFormPetComponent', () => {
  let component: ModalFormPetComponent;
  let fixture: ComponentFixture<ModalFormPetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFormPetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
