import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormNoteComponent } from './modal-form-note.component';

describe('ModalFormNoteComponent', () => {
  let component: ModalFormNoteComponent;
  let fixture: ComponentFixture<ModalFormNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFormNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
