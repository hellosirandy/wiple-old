import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartProvider, ExpenseProvider } from '../../providers/providers';
import { Expense, Pie } from '../../models/models';

@Component({
  selector: 'stats-content',
  templateUrl: 'stats-content.html'
})
export class StatsContentComponent implements OnChanges {
  @Input() parentDiv: ElementRef;
  @Input() expenses: Expense[];

  private chartOption;
  private pile: any;
  private pileKeys: string[]=[];
  private pileAmounts: number[]=[];

  constructor(
    public chart: ChartProvider,
    public expense: ExpenseProvider,
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenses && changes.expenses.currentValue !== changes.expenses.previousValue && this.parentDiv) {
      if (changes.expenses.currentValue.length > 0) {
        const compileStats = this.expense.compileStats(changes.expenses.currentValue);
        const stats: Pie[]=compileStats.pie;
        this.pile = compileStats.pile;
        this.pileKeys = Object.keys(this.pile);
        this.calculateAmounts(this.pile, this.pileKeys);
        this.chartOption = this.chart.renderPieChart(stats, this.parentDiv);
      }
    }
  }

  calculateAmounts(pile, keys: string[]) {
    for (let k of keys) {
      let total=0;
      for (let exp of pile[k]) {
        total += this.expense.getAmount(exp);
      }
      this.pileAmounts[k] = total;
    }
    
  }

}
