import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { InitialPage } from '../initial/initial';

@Component({
  selector: 'page-main-app',
  templateUrl: 'main-app.html',
})
export class MainAppPage {
  private partnerSubscription;
  private partner;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
    this.user.getCurrentUserKey().then(userKey => {
      this.partnerSubscription = this.user.getPartner(userKey).subscribe(partner => {
        if (this.partner && !partner) {
          this.navCtrl.setRoot(InitialPage, {}, {animate: true});
        }
        this.partner = partner;
      });
    });
  }

  ionViewWillUnload() {
    this.partnerSubscription.unsubscribe()
  }

}
