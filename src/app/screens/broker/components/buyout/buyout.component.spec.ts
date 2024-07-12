import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyoutComponent } from './buyout.component';

describe('BuyoutComponent', () => {
  let component: BuyoutComponent;
  let fixture: ComponentFixture<BuyoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyoutComponent]
    });
    fixture = TestBed.createComponent(BuyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
