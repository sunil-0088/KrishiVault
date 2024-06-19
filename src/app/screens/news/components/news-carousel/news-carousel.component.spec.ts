import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCarouselComponent } from './news-carousel.component';

describe('NewsCarouselComponent', () => {
  let component: NewsCarouselComponent;
  let fixture: ComponentFixture<NewsCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsCarouselComponent]
    });
    fixture = TestBed.createComponent(NewsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
