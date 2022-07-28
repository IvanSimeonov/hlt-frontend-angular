import { TestBed } from '@angular/core/testing';

import { FoodResolver } from './food.resolver';

describe('FoodResolver', () => {
  let resolver: FoodResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FoodResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
