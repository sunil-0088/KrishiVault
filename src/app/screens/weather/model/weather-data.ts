export interface WeatherData {
  location: Location;
  current: CurrentWeather;
}
export interface CurrentWeather {
  last_updated: string;
  temp_c: number;
  condition: Condition;
  wind_kph: number;
  wind_dir: string;
  pressure_in: number;
  humidity: number;
  cloud: number;
  heatindex_c: number;
  uv: number;
}
export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

