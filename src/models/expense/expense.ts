import { ExpenseCategory, PayType } from '../models';

export class Expense {
  constructor(
    public together: boolean,
    public category: ExpenseCategory,
    public description: string,
    public firstExpense: number,
    public secondExpense: number,
    public firstPaid: number,
    public secondPaid: number,
    public payType: PayType='allpay',
    public dateTime: number,
    public reverseDateTime: number=-dateTime
  ) {

  }
}