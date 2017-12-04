import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ExpenseProvider, TimeProvider } from '../../providers/providers';
import { Expense, TimeInterval } from '../../models/models';
@Component({
  selector: 'statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsComponent implements OnChanges {
  @ViewChild('expensesArea') expensesArea: ElementRef;
  @ViewChild('content') content: ElementRef;
  @Input() timeInterval: string='year';
  @Input() expenses: Expense[]=[];
  @Output() switchTimeInterval = new EventEmitter<TimeInterval>();
  private totalAmount: number=0;
  public amountCaculated: 0|1=1;
  private expensesAreaHeight: number=window.innerHeight;

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
      this.expensesAreaHeight = window.innerHeight - this.expensesArea.nativeElement.getBoundingClientRect().top-5;
    }
  }

  switchType(type: TimeInterval) {
    this.switchTimeInterval.emit(type);
  }

}
