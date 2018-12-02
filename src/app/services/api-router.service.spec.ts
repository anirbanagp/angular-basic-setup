import { TestBed, inject } from '@angular/core/testing';

import { ApiRouterService } from './api-router.service';

describe('ApiRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRouterService]
    });
  });

  it('should be created', inject([ApiRouterService], (service: ApiRouterService) => {
    expect(service).toBeTruthy();
  }));
});
