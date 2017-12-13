import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { InitialPage } from '../initial/initial';
import { Expense, MobileStatsDisplay, TimeInterval, User } from '../../models/models';
import { CoupleProvider, ExpenseProvider, UserProvider } from '../../providers/providers';

@Component({
  selector: 'page-main-app',
  templateUrl: 'main-app.html',
})
export class MainAppPage {
  private currentUserSub;
  private coupleSub;

  private cp;
  private partner: User;
  private currentUser: User;
  private mobile: boolean;
  public mobileSelect: MobileStatsDisplay='integrate';

  public timeInterval: TimeInterval='day';
  
  private expenses: Expense[]=[];
  private expenseSub;

  constructor(
    public couple: CoupleProvider,
    public expense: ExpenseProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public plt: Platform,
    public user: UserProvider,
  ) {
    this.mobile = plt.is('mobile');
  }

  ionViewDidLoad() {
    this.user.getCurrentUser().then(obs => {
      this.currentUserSub = obs.subscribe(cu => {
        this.currentUser = cu;
        if (cu.couple) {
          this.couple.setCouple(cu.couple).then(_ => {
            this.coupleSub  = this.couple.getCouple(cu.couple).subscribe((cp: any) => {
              this.cp = cp;
              const partnerKey = cp.first === cu.key ? cp.second : cp.first;
              const sub = this.user.getPartner(partnerKey).subscribe((partner: User) => {
                this.partner = partner;
                sub.unsubscribe();
              });
              this.switchTimeInterval({
                timeInterval: this.timeInterval,
                selectedTime: new Date().getTime()
              });
            });
          })
        } else {
          this.navCtrl.setRoot(InitialPage, {}, {animate: true});
        }
      });
    });
    
  }

  ionViewWillUnload() {
    this.coupleSub.unsubscribe();
    this.currentUserSub.unsubscribe();
  }

  switchTimeInterval(event) {
    if (this.expenseSub) {
      this.expenseSub.unsubscribe();
    }
    this.timeInterval = event.timeInterval;
    this.expenseSub = this.expense.getExpense(this.currentUser.couple, event.timeInterval, event.selectedTime).subscribe((expenses: any) => {
      this.expenses = expenses;
    });
  }

}
