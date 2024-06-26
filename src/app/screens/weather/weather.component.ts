import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  startWith,
} from 'rxjs';
import { WeatherData } from './model/weather-data';
import { FormControl } from '@angular/forms';
import { HistoryData } from './model/history-data';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherData!: WeatherData;
  forecastData: any;
  historyData: HistoryData[] = [];
  location: string = '';
  searchControl: FormControl = new FormControl();
  private searchSubject: Subject<string> = new Subject();
  options: any; // sample options
  isloading: boolean = true;
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
        });
      });

    // Subscribe to the FormControl changes
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchSubject.next(value);
    });
  }

  getWeather(location: string): void {
    this.weatherService.getForecastByLocation(location).subscribe((data) => {
      this.getHistoricalData(location);
      this.weatherData = data;
    });
  }

  getHistoricalData(location: string): void {
    this.isloading = true; // Set loading to true when starting the requests
    const observables = [];
  
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      observables.push(this.weatherService.getHistoryByLocation(location, dateString));
    }
  
    forkJoin(observables)
      .pipe(
        map((responses) => {
          return responses.map((response) => response); // Process each response if needed
        })
      )
      .subscribe(
        (data) => {
          this.historyData = data;
          this.isloading = false;
        },
        (error) => {
          console.error('Error fetching historical data:', error);
          this.isloading = false;
        }
      );
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

        this.weatherService
          .getForecastByLocation(`${lat},${lon}`)
          .subscribe((data) => {
            this.weatherData = data;
            this.getHistoricalData(`${lat},${lon}`);

            console.log(this.weatherData);
          });

        
      });
    }
  }
}
