import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsCarouselComponent } from './components/news-carousel/news-carousel.component';
import { NewsCarouselItemComponent } from './components/news-carousel-item/news-carousel-item.component';



@NgModule({
  declarations: [
    NewsComponent,
    NewsCardComponent,
    NewsCarouselComponent,
    NewsCarouselItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NewsModule { }
