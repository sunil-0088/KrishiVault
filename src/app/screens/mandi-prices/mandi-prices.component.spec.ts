import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandiPricesComponent } from './mandi-prices.component';

describe('MandiPricesComponent', () => {
  let component: MandiPricesComponent;
  let fixture: ComponentFixture<MandiPricesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MandiPricesComponent]
    });
    fixture = TestBed.createComponent(MandiPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
