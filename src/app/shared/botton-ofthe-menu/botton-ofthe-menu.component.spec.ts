import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonOftheMenuComponent } from './botton-ofthe-menu.component';

describe('BottonOftheMenuComponent', () => {
  let component: BottonOftheMenuComponent;
  let fixture: ComponentFixture<BottonOftheMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottonOftheMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottonOftheMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
