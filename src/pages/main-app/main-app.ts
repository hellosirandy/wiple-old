import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { InitialPage } from '../initial/initial';
import { User } from '../../models/user';
import { CoupleProvider } from '../../providers/couple/couple';

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

  constructor(
    public couple: CoupleProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
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
