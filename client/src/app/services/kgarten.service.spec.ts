import { TestBed, inject } from '@angular/core/testing';

import { KgartenService } from './kgarten.service';

describe('KgartenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KgartenService]
    });
  });

  it('should ...', inject([KgartenService], (service: KgartenService) => {
    expect(service).toBeTruthy();
  }));
});
