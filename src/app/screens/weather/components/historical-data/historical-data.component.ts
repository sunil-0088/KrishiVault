import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { HistoryData } from '../../model/history-data';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss'],
})
export class HistoricalDataComponent implements AfterViewInit {
  @Input()
  historyData: HistoryData[] | undefined;

  @ViewChild('historyChart') chartRef: ElementRef | undefined;


  ngAfterViewInit(): void {
    if (this.historyData) {
      const ctx = this.chartRef!.nativeElement.getContext('2d');
      console.log(this.historyData);
      this.initializeChart(ctx);
    }
  }
  initializeChart(ctx: any) {
    const dates: string[] = [];
    const temps: number[] = [];
    const humidity: number[] = [];
    const wind: number[] = [];

    if (this.historyData) {
      this.historyData!.map((data) => {
        const forecastData = data.forecast.forecastday.at(0);

        dates.push(forecastData?.date!);
        temps.push(forecastData?.day.avgtemp_c!);
        humidity.push(forecastData?.day.avghumidity!);
        wind.push(forecastData?.day.maxwind_mph!);
      });
      console.log(dates);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: ' Avg Temperature (°C)',
              data: temps,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              yAxisID: 'y-axis-temp',
              borderWidth: 1,
            },
            {
              label: 'Humidity',
              data: humidity,
              borderColor: 'rgb(161, 235, 91,1)',
              backgroundColor: 'rgb(161, 235, 91,0.2)',
              yAxisID: 'y-axis-Rain',
              borderWidth: 1,
            },
            {
              label: 'Wind',
              data: wind,
              borderColor: 'rgb(161, 115, 91,1)',
              backgroundColor: 'rgb(161, 115, 91,0.2)',
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
                text: 'Dates',
                align: 'center',
              },
            },
          },

          responsive: true,
        },
      });
    }
  }
}
