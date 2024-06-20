import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { FormsModule } from '@angular/forms';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastComponent } from './components/forecast/forecast.component';


@NgModule({
  declarations: [WeatherComponent, CurrentWeatherComponent, ForecastComponent],
  imports: [CommonModule, FormsModule],
})
export class WeatherModule {}
