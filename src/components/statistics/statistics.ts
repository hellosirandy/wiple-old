import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ExpenseProvider, TimeProvider } from '../../providers/providers';
import { Expense } from '../../models/models';
@Component({
  selector: 'statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsComponent implements OnChanges {
  @Input() timeInterval: string='year';
  @Input() expenses: Expense[]=[];
  @Output() switchTimeInterval = new EventEmitter<'year'|'month'|'day'>();
  private totalAmount: number=0;
  public amountCaculated: 0|1=1;

  constructor(
    public expense: ExpenseProvider,
    public time: TimeProvider,
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenses && changes.expenses.currentValue !== changes.expenses.previousValue) {
      this.amountCaculated = 0;
      this.totalAmount = this.expense.getTotalAmount(changes.expenses.currentValue);
      if (!changes.expenses.firstChange) {
        setTimeout(() => {
          this.amountCaculated = 1;
        }, 100);
      }
    }
  }

  switchType(type: 'year'|'month'|'day') {
    this.switchTimeInterval.emit(type);
  }

}
