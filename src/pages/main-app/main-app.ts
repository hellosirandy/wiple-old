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

  public timeInterval: TimeInterval='year';
  
  private expenses: Expense[]=[];
  private expenseSub;

  private chartOption: any;
  
  constructor(
    public couple: CoupleProvider,
    public expense: ExpenseProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public plt: Platform,
    public user: UserProvider,
  ) {
    this.mobile = plt.is('mobile');
    this.chartOption = {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Fruit Consumption'
      },
      xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
          title: {
              text: 'Fruit eaten'
          }
      },
      series: [{
          name: 'Jane',
          data: [1, 0, 4]
      }, {
          name: 'John',
          data: [5, 7, 3]
      }]
    };
  }

  ionViewDidLoad() {
    this.user.getCurrentUser().then(obs => {
      this.currentUserSub = obs.subscribe(cu => {
        this.currentUser = cu;
        if (cu.couple) {
          this.coupleSub  = this.couple.getCouple(cu.couple).subscribe((cp: any) => {
            this.cp = cp;
            const partnerKey = cp.first === cu.key ? cp.second : cp.first;
            const sub = this.user.getPartner(partnerKey).subscribe((partner: User) => {
              this.partner = partner;
              sub.unsubscribe();
            });
            this.switchTimeInterval(this.timeInterval);
          });
          
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

  switchTimeInterval(timeInterval: TimeInterval) {
    if (this.expenseSub) {
      this.expenseSub.unsubscribe();
    }
    this.timeInterval = timeInterval;
    this.expenseSub = this.expense.getExpense(this.currentUser.couple, timeInterval).subscribe((expenses: any) => {
      this.expenses = expenses;
    });
  }

}
