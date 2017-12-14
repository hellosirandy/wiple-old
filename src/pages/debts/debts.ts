import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { CoupleProvider, ExpenseProvider, TimeProvider, UserProvider } from '../../providers/providers';
import { Couple, Expense, User } from '../../models/models';
import { WiplePayPage } from '../wiple-pay/wiple-pay';
import { DisplayExpensePage } from '../display-expense/display-expense';

@Component({
  selector: 'page-debts',
  templateUrl: 'debts.html',
})
export class DebtsPage {
  @ViewChild('footer') footer: ElementRef;
  private coupleKey: string;
  private desplayExpenses: { time: string, description: string, amount: number, isWiple: boolean }[]=[];
  private expenseSub;
  private partner: User;
  private footerTitle: string='';
  private total: number=0;
  private ios: boolean=false;
  private footerHeight: number=0;
  private expenses;

  constructor(
    public couple: CoupleProvider,
    public expense: ExpenseProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public plt: Platform,
    public time: TimeProvider,
    public user: UserProvider,
  ) {
    this.coupleKey = navParams.get('coupleKey');
    this.ios = plt.is('ios');
  }

  ionViewDidLoad() {
    this.user.getCurrentUserKey().then(userKey => {
      const sub = this.couple.getCouple(this.coupleKey).subscribe((couple: Couple) => {
        sub.unsubscribe();
        let position: 'first'|'second';
        let partnerKey: string;
        if (couple.first === userKey) {
          position = 'first';
          partnerKey = couple.second;
        } else {
          position = 'second';
          partnerKey = couple.first;
        }
        const partnerSub = this.user.getPartner(partnerKey).subscribe((partner: User) => {
          partnerSub.unsubscribe();
          this.partner = partner;
          this.expenseSub = this.expense.getExpense(this.coupleKey).subscribe((expenses: any) => {
            this.expenses = expenses;
            this.processExpense(expenses, position);
          });
        });
      });
    });
    if (this.footer) {
      this.footerHeight = this.footer.nativeElement.offsetHeight;
    }
  }

  ionViewWillUnload() {
    this.expenseSub.unsubscribe();
  }

  processExpense(expenses: Expense[], position: 'first'|'second') {
    this.desplayExpenses = [];
    let total = 0;
    this.desplayExpenses = expenses.map(e => {
      const amount = this.expense.calculateDebt(e, position);
      const isWiple = e.payType === 'wiple';
      total += amount;
      return { time: this.time.getFormatTime(e.dateTime), description: e.description, amount, isWiple };
    });
    if (total !== 0) {
      this.footerTitle = 'Total';
    } else {
      this.footerTitle = 'You are a Wise Couple';
    }
    this.total = total;
  }

  handleWipleClick() {
    this.navCtrl.push(WiplePayPage, { coupleKey: this.coupleKey });
  }

  handleExpenseClick(index: number) {
    const modal = this.modalCtrl.create(DisplayExpensePage, { expense: this.expenses[index] });
    modal.present();
  }

}
