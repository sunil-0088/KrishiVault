import { Alerts } from './alert-data';
import { Current } from './current-weather';
import { Forecast } from './forecast';

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherData {
  location: Location;
  current: Current;
  forecast: Forecast;
  alerts: Alerts;
}
