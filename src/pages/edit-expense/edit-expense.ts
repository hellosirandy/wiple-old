import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AmountType, ExpenseCategory } from '../../models/models';
import { CoupleProvider, UserProvider } from '../../providers/providers';

@Component({
  selector: 'page-edit-expense',
  templateUrl: 'edit-expense.html',
})
export class EditExpensePage {
  private mobile: boolean=false;
  private phase: 1|2|3=3;

  private expenseCategory: ExpenseCategory='else';
  private description: string='';

  private amountType: AmountType=null;
  private firstExpense: number=0;
  private secondExpense: number=0;

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
    this.expenseCategory = event.expenseCategory;
    this.description = event.description;
    this.phase ++;
  }

  amountSubmit(event) {
    this.amountType = event.amountType;
    this.firstExpense = event.firstExpense;
    this.secondExpense = event.secondExpense;
    this.phase ++;
  }

  goBack() {
    this.phase --;
  }

}
