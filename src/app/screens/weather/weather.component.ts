import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs';
import { WeatherData } from './model/weather-data';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherData!: WeatherData;
  forecastData: any;
  historyData: any[] = [];
  location: string = '';
  searchControl: FormControl = new FormControl();
  private searchSubject: Subject<string> = new Subject();
  options: any; // sample options

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // Subscribe to the subject with debounceTime
    this.getDeviceLocation();

    this.searchSubject
      .pipe(
        debounceTime(300), // Adjust the debounce time as needed
        distinctUntilChanged() // Only emit when the current value is different from the last
      )
      .subscribe((searchText) => {
        this.weatherService.getSearchLocations(searchText).subscribe((data) => {
          this.options = data;
          console.log(this.options);
        });
      });

    // Subscribe to the FormControl changes
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchSubject.next(value);
    });
  }

  getWeather(location: string): void {
    // this.weatherService.getWeatherByLocation(location).subscribe((data) => {
    //   this.weatherData = data;
    // });

    this.weatherService.getForecastByLocation(location).subscribe((data) => {
      this.weatherData = data;
      console.log(this.weatherData);
    });

    // this.getHistoricalData(location);
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
        // this.weatherService
        //   .getWeatherByLocation(`${lat},${lon}`)
        //   .subscribe((data) => {
        //     this.weatherData = data;
        //     console.log(this.weatherData);
        //   });
        console.log(`${lat},${lon}`);

        this.weatherService
          .getForecastByLocation(`${lat},${lon}`)
          .subscribe((data) => {
            this.weatherData = data;
            console.log(this.weatherData);
          });

        this.getHistoricalData(`${lat},${lon}`);
      });
    }
  }
}
