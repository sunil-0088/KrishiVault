import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ForecastDay } from '../../model/forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  @Input()
  forecastDays: ForecastDay[] | undefined;

  ngOnInit(): void {
    // console.log(this.forecastDays);
  }
}
