import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';

declare var bootstrap: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('myChart') chartRef: ElementRef | undefined;
  chart: Chart | undefined;
  dates: string[] = ['17/7', '18/7', '19/7', '20/7', '21/7', '22/7','23/7',];

  ngAfterViewInit(): void {
    const ctx = this.chartRef!.nativeElement.getContext('2d');
    this.initializeChart(ctx);
    this.updateChartAspectRatio();
    const popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new bootstrap.Popover(popoverTriggerEl, {
        container: 'body',
      });
    });
  }

  initializeChart(ctx: any) {
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'Farmer Count',
            data: [1, 2, 3, 4, 5, 6, 7],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            yAxisID: 'y-axis-temp',
            borderWidth: 1,
          },
          {
            label: 'Farmer Count',
            data: [2, 5, 6, 1, 7, 4, 3],
            borderColor: 'rgba(75, 92, 175, 1)',
            backgroundColor: 'rgba(75, 92, 175, 0.2)',
            yAxisID: 'y-axis-temp',
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
              text: '-- Date --',
              align: 'center',
            },
          },
        },

        responsive: true,
      },
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateChartAspectRatio();
  }

  updateChartAspectRatio() {
    const width = window.innerWidth;
    let aspectRatio = 3;

    if (width < 450) {
      aspectRatio = 1.4;
    } else if (width < 700) {
      aspectRatio = 2;
    }

    if (this.chartRef) {
      this.chart!.options.aspectRatio = aspectRatio;
      this.chart!.update();
    }
  }
}
