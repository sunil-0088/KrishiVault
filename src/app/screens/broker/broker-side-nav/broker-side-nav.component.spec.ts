import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerSideNavComponent } from './broker-side-nav.component';

describe('BrokerSideNavComponent', () => {
  let component: BrokerSideNavComponent;
  let fixture: ComponentFixture<BrokerSideNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrokerSideNavComponent]
    });
    fixture = TestBed.createComponent(BrokerSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
