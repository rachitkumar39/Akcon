import { TestBed } from '@angular/core/testing';

import { HttpManageInterceptortService } from './http-manage-interceptort.service';

describe('HttpManageInterceptortService', () => {
  let service: HttpManageInterceptortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpManageInterceptortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
