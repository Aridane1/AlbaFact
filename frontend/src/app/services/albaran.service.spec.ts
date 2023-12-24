import { TestBed } from '@angular/core/testing';

import { AlbaranService } from './albaran.service';

describe('AlbaranService', () => {
  let service: AlbaranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbaranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
