import { TestBed, inject } from '@angular/core/testing';

import { NewDogService } from './new.service';

describe('NewDogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewService]
    });
  });

  it('should ...', inject([NewService], (service: NewDogService) => {
    expect(service).toBeTruthy();
  }));
});
