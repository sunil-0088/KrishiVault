import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerContentComponent } from './farmer-content.component';

describe('FarmerContentComponent', () => {
  let component: FarmerContentComponent;
  let fixture: ComponentFixture<FarmerContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerContentComponent]
    });
    fixture = TestBed.createComponent(FarmerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
