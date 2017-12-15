import { ElementRef, Injectable } from '@angular/core';
import { Piece } from '../../models/models';

@Injectable()
export class ChartProvider {

  constructor() {
  }

  renderPieChart(stats: Piece[], parentDiv: ElementRef) {
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

  renderUserChart(stats: Piece[], parentDiv: ElementRef) {
    const width = parentDiv.nativeElement.getBoundingClientRect().width;
    return {
      chart: {
        type: 'bar',
				width: width,
			},
			title: {
				text: ''
			},
			xAxis: {
				labels: {
					enabled: false
				}
			},
			yAxis: {
				title: {
					text: ''
				},
				labels: {
					enabled: false
				}
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				series: {
					borderWidth: 0,
					dataLabels: {
						enabled: true,
						format: '{point.y}'
					},
					pointPadding: 0,
					pointWidth: 30
				}
			},

			tooltip: {
				headerFormat: '<span style="font-size:15px;font-weight:bold">{point.name}</span><br>',
				pointFormat: '<span style="color:{point.color};text-transform: capitalize;">{point.name}</span>'
			},
			series: [{
				colorByPoint: true,
				data: stats
			}],
			credits: {
				enabled: false
			}
		}
  }
}
