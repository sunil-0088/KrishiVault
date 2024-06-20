import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCarouselItemComponent } from './news-carousel-item.component';

describe('NewsCarouselItemComponent', () => {
  let component: NewsCarouselItemComponent;
  let fixture: ComponentFixture<NewsCarouselItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsCarouselItemComponent]
    });
    fixture = TestBed.createComponent(NewsCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
