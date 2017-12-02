import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

import { ConnectPage } from '../connect/connect';
import { HomePage } from '../home/home';
import { MainAppPage } from '../main-app/main-app';

@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class InitialPage {

  constructor(
    public events: Events,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
    const subscription = this.user.getAuthState().subscribe(user => {
      if (user) {
        this.user.getOrCreateUser(user).then((u) => {
          this.events.publish('user:login');
          if (u.couple) {
            this.navCtrl.setRoot(MainAppPage);
          } else {
            this.navCtrl.setRoot(ConnectPage);
          }
        });
      } else {
        this.navCtrl.setRoot(HomePage);
      }
      subscription.unsubscribe();
    });
  }
}
