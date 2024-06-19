import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  newsList = [
    {
      imageUrl: 'https://via.placeholder.com/150',
      title: 'News Title 1',
      description: 'Description 1',
      link: '#',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      title: 'News Title 2',
      description: 'Description 2',
      link: '#',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      title: 'News Title 3',
      description: 'Description 3',
      link: '#',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      title: 'News Title 4',
      description: 'Description 4',
      link: '#',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      title: 'News Title 5',
      description: 'Description 5',
      link: '#',
    },
  ];
}
