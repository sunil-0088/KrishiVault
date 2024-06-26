import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.weatherApiKey;
  private apiUrl = environment.weatherApiUrl;

  constructor(private http: HttpClient) {}

  getWeatherByLocation(location: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/current.json?key=${this.apiKey}&q=${location}`
    );
  }

  getForecastByLocation(location: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/forecast.json?key=${this.apiKey}&alerts=yes&q=${location}&days=3`
    );
  }

  getHistoryByLocation(location: string, date: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/history.json?key=${this.apiKey}&q=${location}&dt=${date}`
    );
  }

  getSearchLocations(location: string) {
    return this.http.get(
      `${this.apiUrl}/search.json?key=${this.apiKey}&q=${location}'`
    );
  }
}
