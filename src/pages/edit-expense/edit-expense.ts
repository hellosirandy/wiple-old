import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AmountType, Expense } from '../../models/models';
import { CoupleProvider, UserProvider } from '../../providers/providers';

@Component({
  selector: 'page-edit-expense',
  templateUrl: 'edit-expense.html',
})
export class EditExpensePage {
  private mobile: boolean=false;
  private phase: 1|2|3=1;
  private currentExpense: Expense= new Expense(true, 'else', '', 0, 0, 0, 0, 'allpay', Date.now());

  private amountType: AmountType=null;

  private coupleSub;
  private coupleKey: string;
  private firstUser;
  private secondUser;
  private firstProfilePic: string;
  private secondProfilePic: string;

  constructor(
    public couple: CoupleProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    plt: Platform,
    public user: UserProvider,
  ) {
    this.mobile = plt.is('mobile');
    this.coupleKey = navParams.get('coupleKey');
  }

  ionViewDidLoad() {
    this.coupleSub = this.couple.getCouple(this.coupleKey).subscribe((cp: any) => {
      const sub1 = this.user.getPartner(cp.first).subscribe(pn => {
        this.firstUser = pn;
        this.firstProfilePic = this.user.getProfilePic(this.firstUser);
        sub1.unsubscribe();
      });
      const sub2 = this.user.getPartner(cp.second).subscribe(pn => {
        this.secondUser = pn;
        this.secondProfilePic = this.user.getProfilePic(this.secondUser);
        sub2.unsubscribe();
      });
    });
  }

  desSubmit(event) {
    this.saveFirstPhase(event);
    this.phase ++;
  }

  amountSubmit(event) {
    this.saveSecondPhase(event);
    this.phase ++;
  }

  goBack() {
    this.phase --;
  }

  saveFirstPhase(event) {
    this.currentExpense.category = event.expenseCategory;
    this.currentExpense.description = event.description;
    this.currentExpense.dateTime = event.dateTime;
  }

  saveSecondPhase(event) {
    this.amountType = event.amountType;
    this.currentExpense.firstExpense = event.firstExpense;
    this.currentExpense.secondExpense = event.secondExpense;
  }

}
