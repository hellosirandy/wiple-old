import { Injectable } from '@angular/core';
import { Expense } from '../../models/models';
import { ApiProvider } from '../api/api';
import * as moment from 'moment';

@Injectable()
export class ExpenseProvider {

  constructor(
    public api: ApiProvider
  ) {
  }

  newExpense(coupleKey: string, expense: Expense) {
    return this.api.newExpense(coupleKey, expense);
  }

  getExpense(coupleKey: string, timeInterval: 'year'|'month'|'day') {
    const start = moment().startOf(timeInterval).valueOf();
    const end = moment().endOf(timeInterval).valueOf();
    return this.api.getExpense(coupleKey, start, end);    
  }

  getTotalAmount(expenses: Expense[]) {
    const amounts = expenses.map(e => {
      return e.firstExpense + e.secondExpense;
    });
    return amounts.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  getAmount(expense: Expense) {
    return expense.firstExpense + expense.secondExpense;
  }

}
