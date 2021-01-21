import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConsultationIdComponent } from './new-consultation-id.component';

describe('NewConsultationIdComponent', () => {
  let component: NewConsultationIdComponent;
  let fixture: ComponentFixture<NewConsultationIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConsultationIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConsultationIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
