import { Expense } from '../expense/expense';
export class Particle {
  constructor(
    public category: string,
    public total: number,
    public expenses: Expense[]
  ) {

  }
}