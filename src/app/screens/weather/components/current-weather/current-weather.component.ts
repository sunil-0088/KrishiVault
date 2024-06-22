import { Component, Input, OnInit } from '@angular/core';
import { Current } from '../../model/current-weather';
import { Day } from '../../model/day-data';
import { Location } from '../../model/weather-data';
import { Astro } from '../../model/astro-data';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  ngOnInit(): void {}

  @Input()
  location: Location | undefined;
  @Input()
  today: Day | undefined;
  @Input()
  currentData: Current | undefined;
  @Input()
  astrodata: Astro | undefined;
}
