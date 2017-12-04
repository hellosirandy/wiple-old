import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Expense, Pie, TimeInterval } from '../../models/models';
import { ExpenseProvider } from '../../providers/providers';
@Component({
  selector: 'mobile-integrate-stats',
  templateUrl: 'mobile-integrate-stats.html'
})
export class MobileIntegrateStatsComponent implements OnChanges {
  @ViewChild('parent') parentDiv: ElementRef;
  @Input() expenses: Expense[]=[];
  @Input() timeInterval: TimeInterval;

  private chartOption: any;

  constructor(
    public expense: ExpenseProvider,
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenses && changes.expenses.currentValue !== changes.expenses.previousValue && this.timeInterval !== 'day') {
      if (changes.expenses.currentValue.length > 0) {
        const stats: Pie[]=this.expense.compileStats(changes.expenses.currentValue)
        this.renderChart(stats);
      }
    }
    // if (changes.timeInterval && changes.timeInterval.currentValue !== changes.timeInterval.previousValue) {
    //   this.expenses = [];
    // }
  }

  renderChart(stats: Pie[]) {
    const width = this.parentDiv.nativeElement.getBoundingClientRect().width*0.75;
    const height = width;
    this.chartOption = {
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
