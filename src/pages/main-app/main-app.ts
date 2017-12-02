import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { InitialPage } from '../initial/initial';
import { User } from '../../models/user';
import { CoupleProvider, UserProvider } from '../../providers/providers';

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
  public mobileSelect: 'first'|'second'|'expense'='expense';

  public timeInterval: 'year'|'month'|'day'='year';

  constructor(
    public couple: CoupleProvider,
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
          this.coupleSub  = this.couple.getCouple(cu.couple).subscribe((cp: any) => {
            this.cp = cp;
            const partnerKey = cp.first === cu.key ? cp.second : cp.first;
            const sub = this.user.getPartner(partnerKey).subscribe((partner: User) => {
              this.partner = partner;
              sub.unsubscribe();
            });
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

}
