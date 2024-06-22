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
  basicData: any;
  basicOptions: any;
  constructor(
  ) {}
  ngOnInit() {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: '2020',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: 0.4,
          borderColor: '#42A5F5',
        },
        {
          label: '2021',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: 0,
          borderColor: '#66BB6A',
        },
        {
          label: '2022',
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: '#FFA726',
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)',
        },
      ],
    };
    this.basicOptions = {
      title: {
        display: true,
        text: 'Article Views',
        fontSize: 32,
        position: 'top',
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }
}

// convertTime(num: number): string {
//     if (num === 0) {
//       return '12:00 AM';
//     } else if (num === 12) {
//       return '12:00 PM';
//     } else if (num > 12) {
//       return `${num - 12}:00 PM`;
//     } else {
//       return `${num}:00 AM`;
//     }
//   }
//   initializeChart() {
//     // const WeatherData = this.forecastDays![0].hour.filter(
//     //   (_, index) => index % 2 === 0
//     // );
//     const times: string[] = [];
//     const temps: number[] = [];
//     const hourData = [];

//     this.forecastDays![0].hour.map((data, index) => {
//       if (index % 2 == 0) times.push(this.convertTime(index));
//       temps.push(data.temp_c);
//     });

//     this.chartOptions = {
//       type: 'line',
//       data: {
//         labels: times,
//         datasets: [
//           {
//             label: 'Temperature (°C)',
//             data: temps,
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             fill: false,
//             yAxisID: 'y-axis-temp',
//           },
//           // {
//           //   label: 'Rain (%)',
//           //   data: rains,
//           //   borderColor: 'rgba(54, 162, 235, 1)',
//           //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           //   fill: false,
//           //   yAxisID: 'y-axis-rain'
//           // }
//         ],
//       },
//       options: {
//         scales: {
//           yAxes: [
//             {
//               id: 'y-axis-temp',
//               type: 'linear',
//               position: 'left',
//               ticks: {
//                 beginAtZero: true,
//               },
//               scaleLabel: {
//                 display: true,
//                 labelString: 'Temperature (°C)',
//               },
//             },
//             {
//               id: 'y-axis-rain',
//               type: 'linear',
//               position: 'right',
//               ticks: {
//                 beginAtZero: true,
//               },
//               scaleLabel: {
//                 display: true,
//                 labelString: 'Rain (%)',
//               },
//             },
//           ],
//         },
//         responsive: true,
//         title: {
//           display: true,
//           text: 'Temperature and Rain Percentage over Time',
//         },
//       },
//     };
//   }
