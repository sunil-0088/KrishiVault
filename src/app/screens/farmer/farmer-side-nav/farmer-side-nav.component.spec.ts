import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerSideNavComponent } from './farmer-side-nav.component';

describe('FarmerSideNavComponent', () => {
  let component: FarmerSideNavComponent;
  let fixture: ComponentFixture<FarmerSideNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerSideNavComponent]
    });
    fixture = TestBed.createComponent(FarmerSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
