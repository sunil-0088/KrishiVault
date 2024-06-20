import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private apiKey = 'cacec25a4af840f9824143249242006';
  private apiUrl = 'https://api.weatherapi.com/v1';

  constructor(public http: HttpClient) {

  }

  getWeatherByLocation(location: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/current.json?key=${this.apiKey}&q=${location}`
    );
  }

  getForecastByLocation(location: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${location}&days=3`
    );
  }

  getHistoryByLocation(location: string, date: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/history.json?key=${this.apiKey}&q=${location}&dt=${date}`
    );
  }
}
