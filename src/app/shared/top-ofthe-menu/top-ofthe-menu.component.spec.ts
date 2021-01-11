import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopOftheMenuComponent } from './top-ofthe-menu.component';

describe('TopOftheMenuComponent', () => {
  let component: TopOftheMenuComponent;
  let fixture: ComponentFixture<TopOftheMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopOftheMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopOftheMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
