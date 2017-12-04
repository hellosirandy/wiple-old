import { Component, Input, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Expense } from '../../models/models';
import { ExpenseProvider } from '../../providers/providers';
@Component({
  selector: 'expense-item',
  templateUrl: 'expense-item.html'
})
export class ExpenseItemComponent implements OnInit {
  @Input('expense') exp: Expense;
  private opacity: 0|1=0;
  private mobile: boolean=false;

  constructor(
    public expense: ExpenseProvider,
    plt: Platform
  ) {
    this.mobile = plt.is('mobile');
  }

  ngOnInit() {
    setTimeout(() => {
      this.opacity = 1;
    }, 100);
  }

}
