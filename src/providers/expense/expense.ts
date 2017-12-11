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

  getExpense(coupleKey: string, timeInterval: 'year'|'month'|'day'|null=null, selectedTime: number|null=null) {
    const start = moment(selectedTime).startOf(timeInterval).valueOf();
    const end = moment(selectedTime).endOf(timeInterval).valueOf();
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
    let expensePile: any={};
    for (let exp of expenses) {
      const amount = this.getAmount(exp);
      if (categories[exp.category]) {
        categories[exp.category].y += amount;
      } else {
        categories[exp.category] = new Pie(exp.category, amount, ExpenseCategoryColos[exp.category]);
      }
      if (expensePile[exp.category]) {
        expensePile[exp.category].push(exp);
      } else {
        expensePile[exp.category] = [exp];
      }
    }
    const pie = Object.keys(categories).map(key => categories[key]);
    const pile = expensePile;
    return { pie, pile };
  }

  calculateDebt(expense: Expense, position: 'first'|'second') {
    const debt = expense.payType === 'treat' ? 0 : expense.firstPaid - expense.firstExpense;
    return position === 'first' ? debt : -debt;
  }

}
