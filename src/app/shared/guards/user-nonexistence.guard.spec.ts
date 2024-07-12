import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { UserNonExistenceGuard } from './user-nonexistence.guard';

describe('userExistenceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => UserNonExistenceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
