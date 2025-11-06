import { TestBed } from '@angular/core/testing';

import { ContinentsService } from './continents.service';

describe('ContinentsService', () => {
  let service: ContinentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContinentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
