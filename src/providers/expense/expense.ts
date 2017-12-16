import { Injectable } from '@angular/core';
import { Expense, ExpenseCategoryColos, MobileStatsDisplay, Particle, Piece } from '../../models/models';
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

  updateExpense(coupleKey: string, expense: Expense) {
    return this.api.updateExpense(coupleKey, expense);
  }

  removeExpense(coupleKey: string, expenseKey: string) {
    return this.api.removeExpense(coupleKey, expenseKey);
  }

  getExpense(coupleKey: string, timeInterval: 'year'|'month'|'day'|null=null, selectedTime: number|null=null) {
    const start = moment(selectedTime).startOf(timeInterval).valueOf();
    const end = moment(selectedTime).endOf(timeInterval).valueOf();
    return this.api.getExpense(coupleKey, start, end);
  }

  getTotalAmount(expenses: Expense[], position: MobileStatsDisplay) {
    const amounts = expenses.map(e => {
      if (position === 'integrate') {
        return e.firstExpense + e.secondExpense;
      } else if (position === 'first') {
        return e.firstExpense;
      } else {
        return e.secondExpense;
      }
    });
    return amounts.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  getAmount(expense: Expense, position: 'first'|'second'|null=null) {
    if (position) {
      return position === 'first' ? expense.firstExpense : expense.secondExpense;
    } else {
      return expense.firstExpense + expense.secondExpense;
    }
  }

  generateStats(expenses: Expense[], position: 'first'|'second'|null=null) {
    let pile: any={};
    for (let exp of expenses) {
      const amount = this.getAmount(exp, position);
      if (amount > 0) {
        if (pile[exp.category]) {
          pile[exp.category].total += amount;
          pile[exp.category].expenses.push(exp);
        } else {
          pile[exp.category] = new Particle(exp.category, amount, [exp]);
        }
      }
    }
    pile = Object.keys(pile).map(key => pile[key]).sort((a, b) => b.total - a.total);
    const pie: Piece[] = this.generatePie(pile);
    return { pie, pile };
  }

  generatePie(pile: Particle[]) {
    return pile.map(p => new Piece(p.category, p.total, ExpenseCategoryColos[p.category]));
  }

  calculateDebt(expense: Expense, position: 'first'|'second') {
    const debt = expense.payType === 'treat' ? 0 : expense.firstPaid - expense.firstExpense;
    return position === 'first' ? debt : -debt;
  }

}
