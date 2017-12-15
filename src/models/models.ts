import { Couple } from './couple';
import { Expense } from './expense/expense';
import { Invitation } from './invitation';
import { Particle } from './particle/particle';
import { Piece } from './piece/piece';
import { User } from './user';

type TimeInterval = 'year'|'month'|'day';
type MobileStatsDisplay = 'first'|'second'|'integrate';
type ExpenseCategory = 'else'|'love'|'life'|'transit'|'entertainment'|'shopping'|'food'|'coffee'|'rent'|'gift'
type PayType = 'allpay'|'treat'|'payfirst'|'custom'|'wiple';
type AmountType = 'same'|'diff'|null;

const ExpenseCategoryColos={
  else: '#ce7ab0',
  love: '#cc4475',
  life: '#f0785a',
  transit: '#f0c419',
  entertainment: '#71c285',
  shopping: '#519677',
  food: '#657396',
  coffee: '#6c7bbc',
  rent: '#825699',
  gift: '#995858'
};

export {
  AmountType,
  Couple, 
  Expense,
  ExpenseCategory,
  ExpenseCategoryColos,
  Invitation,
  MobileStatsDisplay,
  Particle,
  PayType,
  Piece,
  TimeInterval,
  User
}