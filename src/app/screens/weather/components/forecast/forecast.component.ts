import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ForecastDay } from '../../model/forecast';
import { Chart, Tooltip } from 'chart.js';
import { HourData } from '../../model/hour-data';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    const ctx = this.chartRef!.nativeElement.getContext('2d');
    this.initializeChart(ctx);
  }
  @ViewChild('myChart') chartRef: ElementRef | undefined;
  times: string[] = [
    '12:00 AM',
    '2:00 AM',
    '4:00 AM',
    '6:00 AM',
    '8:00 AM',
    '10:00 AM',
    '12:00 PM',
    '2:00 PM',
    '4:00 PM',
    '6:00 PM',
    '8:00 PM',
    '10:00 PM',
    '11:00 PM',
  ];
  @Input()
  forecastDays: ForecastDay[] | undefined;

  ngOnInit(): void {
    // console.log(this.forecastDays);
  }
  convertTime(num: number): string {
    if (num === 0) {
      return '12:00 AM';
    } else if (num === 12) {
      return '12:00 PM';
    } else if (num > 12) {
      return `${num - 12}:00 PM`;
    } else {
      return `${num}:00 AM`;
    }
  }
  initializeChart(ctx: any) {
    const times: string[] = [];
    const temps: number[] = [];
    const hourData: number[] = [];

    this.forecastDays![0].hour.map((data, index) => {
      if (index % 2 == 0) {
        times.push(this.convertTime(index));
        temps.push(data.temp_c);
        hourData.push(data.chance_of_rain);
      }
    });
    const chartOptions = {};

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: times,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temps,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            yAxisID: 'y-axis-temp',
            borderWidth: 1,
          },
          {
            label: 'Rain %',
            data: hourData,
            borderColor: 'rgb(161, 235, 91,1)',
            backgroundColor: 'rgb(161, 235, 91,0.2)',
            yAxisID: 'y-axis-Rain',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {},
        scales: {
          // y: {
          //   title: {
          //     display:true,
          //     text: 'Temperature (°C)',
          //     align: 'center',
          //   },
          // },
          x: {
            title: {
              display: true,
              text: 'Time',
              align: 'center',
            },
          },
        },

        responsive: true,
      },
    });
  }
}
