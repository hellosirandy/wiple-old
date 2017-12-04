import { Injectable } from '@angular/core';
import { Expense, ExpenseCategoryColos, Pie } from '../../models/models';
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

  compileStats(expenses: Expense[]) {
    let categories:any={};
    for (let exp of expenses) {
      const amount = this.getAmount(exp);
      if (categories[exp.category]) {
        categories[exp.category].y += amount;
      } else {
        categories[exp.category] = new Pie(exp.category, amount, ExpenseCategoryColos[exp.category]);
      }
    }
    return Object.keys(categories).map(key => categories[key]);
  }

}
