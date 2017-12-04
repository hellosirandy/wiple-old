import { ExpenseCategory } from '../models';

export class Expense {
  constructor(
    public together: boolean,
    public category: ExpenseCategory,
    public description: string,
    public firstExpense: number,
    public secondExpense: number,
    public payType: 'allpay'|'firstpay'|'firsttreat'|'secondpay'|'secondtreat'='allpay',
    public dateTime: number,
    public reverseDateTime: number=-dateTime
  ) {

  }
}