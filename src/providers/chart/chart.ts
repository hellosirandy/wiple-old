import { ElementRef, Injectable } from '@angular/core';
import { Pie } from '../../models/models';

@Injectable()
export class ChartProvider {

  constructor() {
  }

  renderPieChart(stats: Pie[], parentDiv: ElementRef) {
    const width = parentDiv.nativeElement.getBoundingClientRect().width*0.75;
    const height = width;
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        width: width,
        height: height,
        style: {
          margin: 'auto'
        }
      },
      title: {
        text: '',
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          borderWidth: 1
        }
      },
      series: [{
        name: 'percentage',
        colorByPoint: true,
        data: stats
      }],
      credits: {
        enabled: false
      }
    };
  }

}
