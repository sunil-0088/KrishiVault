import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ChartModule } from 'primeng/chart'; 


@NgModule({
  declarations: [WeatherComponent, CurrentWeatherComponent, ForecastComponent],
  imports: [CommonModule, FormsModule,ReactiveFormsModule,ChartModule],
})
export class WeatherModule {}
