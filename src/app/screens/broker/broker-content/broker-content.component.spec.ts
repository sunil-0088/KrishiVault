import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerContentComponent } from './broker-content.component';

describe('BrokerContentComponent', () => {
  let component: BrokerContentComponent;
  let fixture: ComponentFixture<BrokerContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrokerContentComponent]
    });
    fixture = TestBed.createComponent(BrokerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
