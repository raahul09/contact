import { TestBed } from '@angular/core/testing';

import { ContactdbService } from './contactdb.service';

describe('ContactdbService', () => {
  let service: ContactdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
