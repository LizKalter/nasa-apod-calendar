import { TestBed } from '@angular/core/testing';

import { NasaApiService } from './nasa-api.service';

describe('NasaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NasaApiService = TestBed.get(NasaApiService);
    expect(service).toBeTruthy();
  });
});
