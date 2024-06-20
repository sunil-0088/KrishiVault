import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Chart } from 'chart.js';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  forecastData: any;
  historyData: any[] = [];
  location: string = '';

  options: string[] = ['New York', 'Los Angeles', 'Chicago']; // sample options

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getDeviceLocation();
  }

  getWeather(location: string): void {
    this.weatherService.getWeatherByLocation(location).subscribe((data) => {
      this.weatherData = data;
    });

    this.weatherService.getForecastByLocation(location).subscribe((data) => {
      this.forecastData = data.forecast.forecastday;
    });

    this.getHistoricalData(location);
  }

  getHistoricalData(location: string): void {
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

      this.weatherService
        .getHistoryByLocation(location, dateString)
        .subscribe((data) => {
          this.historyData.push(data);
        });
    }

    console.log(this.historyData);
  }

  onSearch(): void {
    this.getWeather(this.location);
  }

  getDeviceLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.weatherService
          .getWeatherByLocation(`${lat},${lon}`)
          .subscribe((data) => {
            this.weatherData = data;
            console.log(this.weatherData);
          });

        this.weatherService
          .getForecastByLocation(`${lat},${lon}`)
          .subscribe((data) => {
            this.forecastData = data.forecast.forecastday;
            console.log(this.forecastData);
            
          });

        this.getHistoricalData(`${lat},${lon}`);
      });
    }
  }
}
