import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsCardComponent } from './components/news-card/news-card.component';



@NgModule({
  declarations: [
    NewsComponent,
    NewsCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NewsModule { }
