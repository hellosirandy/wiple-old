import { Component, Input, OnInit } from '@angular/core';
import { Expense } from '../../models/models';
import { ExpenseProvider } from '../../providers/providers';
@Component({
  selector: 'expense-item',
  templateUrl: 'expense-item.html'
})
export class ExpenseItemComponent implements OnInit {
  @Input('expense') exp: Expense;
  private opacity: 0|1=0;

  constructor(
    public expense: ExpenseProvider
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.opacity = 1;
    }, 100);
  }

}
