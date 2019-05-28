import { TestBed } from '@angular/core/testing';

import { ErrorMessageService } from './error-message.service';

describe('ErrorMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorMessageService = TestBed.get(ErrorMessageService);
    expect(service).toBeTruthy();
  });
});
