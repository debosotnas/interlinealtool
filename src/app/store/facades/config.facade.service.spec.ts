import { TestBed } from '@angular/core/testing';

import { ConfigFacade } from './config.facade';

describe('ConfigFacade', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigFacade = TestBed.get(ConfigFacade);
    expect(service).toBeTruthy();
  });
});
