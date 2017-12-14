import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { EditExpensePage } from '../edit-expense/edit-expense';
import { WiplePayPage } from '../wiple-pay/wiple-pay';
import { CoupleProvider, ExpenseProvider, TimeProvider, UserProvider } from '../../providers/providers';
import { Couple } from '../../models/models';

@Component({
  selector: 'page-display-expense',
  templateUrl: 'display-expense.html',
})
export class DisplayExpensePage {

  private ios: boolean=false;
  private exp;
  private date: string='';
  private coupleKey: string;
  private firstDisplayName: string='';
  private secondDisplayName: string='';
  private whoTreat: string;
  private wiplePay: string;

  constructor(
    public alertCtrl: AlertController,
    public couple: CoupleProvider,
    public expense: ExpenseProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    plt: Platform,
    public time: TimeProvider,
    public user: UserProvider,
    public viewCtrl: ViewController,
  ) {
    this.ios = plt.is('ios');
    this.exp = navParams.get('expense');
  }

  ionViewDidLoad() {
    this.date = this.time.getFormatTime(this.exp.dateTime);
    this.couple.getCoupleKey().then(coupleKey => {
      this.coupleKey = coupleKey;
      const sub = this.couple.getCouple(coupleKey).subscribe((cp: Couple) => {
        sub.unsubscribe();
        this.user.getUserDisplayName(cp.first).then((name: string) => {
          this.firstDisplayName = name;
          if (this.exp.payType === 'treat' && this.exp.firstPaid > 0) {
            this.whoTreat = name + 'Treated';
          }
          return this.user.getUserDisplayName(cp.second);
        }).then((name: string) => {
          this.secondDisplayName = name;
          if (this.exp.payType === 'treat' && this.exp.secondPaid > 0) {
            this.whoTreat = name + 'Treated';
          }
        });
      });
    });
    if (this.exp.payType === 'wiple') {
      this.wiplePay = 'Wiple Pay';
    }
  }

  edit() {
    if (this.exp.payType === 'wiple') {
      this.navCtrl.push(WiplePayPage, { coupleKey: this.coupleKey, expense: this.exp });
    } else {
      this.navCtrl.push(EditExpensePage, { coupleKey: this.coupleKey, expense: this.exp });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  remove() {
    let alert = this.alertCtrl.create({
      title: 'Confirm remove',
      message: 'Do you want to remove this expense?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          handler: () => {
            this.expense.removeExpense(this.coupleKey, this.exp.key);
            this.dismiss();
          }
        }
      ]
    });
    alert.present();
    
  }

}
