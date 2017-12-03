export class Expense {
  constructor(
    public together: boolean,
    public category: 'entertainment'|'food'|'transit'|'shopping',
    public description: string,
    public firstExpense: number,
    public secondExpense: number,
    public payType: 'allpay'|'firstpay'|'firsttreat'|'secondpay'|'secondtreat'='allpay',
    public dateTime: number,
    public reverseDateTime: number=-dateTime
  ) {

  }
}