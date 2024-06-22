import { Astro } from "./astro-data";
import { Day } from "./day-data";
import { HourData } from "./hour-data";

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
  hour: HourData[];
}

export interface Forecast {
  forecastday: ForecastDay[];
}
