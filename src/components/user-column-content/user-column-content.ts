import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartProvider, ExpenseProvider } from '../../providers/providers';
import { Expense, Piece } from '../../models/models';

@Component({
  selector: 'user-column-content',
  templateUrl: 'user-column-content.html'
})
export class UserColumnContentComponent implements OnChanges {
  @ViewChild('parent') parentDiv: ElementRef;
  @Input() expenses: Expense[];
  @Input() position: 'first'|'second';
  private chartOption;
  
  constructor(
    public chart: ChartProvider,
    public expense: ExpenseProvider,
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.expenses && changes.expenses.currentValue !== changes.expenses.previousValue) || 
    (changes.position && changes.position.currentValue !== changes.position.previousValue)) {
      const expenses = changes.expenses ? changes.expenses.currentValue : this.expenses;
      const position = changes.position ? changes.position.currentValue : this.position;
      const compileStats = this.expense.generateStats(expenses, position);
      const pie: Piece[]=compileStats.pie;
      this.chartOption = this.chart.renderUserChart(pie, this.parentDiv);
    }
  }

}
