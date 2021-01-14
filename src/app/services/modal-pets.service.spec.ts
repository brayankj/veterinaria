import { TestBed } from '@angular/core/testing';

import { ModalPetsService } from './modal-pets.service';

describe('ModalPetsService', () => {
  let service: ModalPetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalPetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
