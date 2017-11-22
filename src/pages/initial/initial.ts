import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

import { HomePage } from '../home/home';
import { ConnectPage } from '../connect/connect';

import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class InitialPage {
  // private iconOpacity: boolean=false;
  // private spinnerExist: boolean=false;

  private authSubscription: Subscription;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
    // setTimeout(() => {
    //   this.iconOpacity = true;
    // }, 100);
    // setTimeout(() => {
    //   this.spinnerExist = true;
    //   this.user.getAuthState().subscribe((user: any) => {
    //     console.log(user);
    //     if (user) {
    //       this.user.getOrCreateUser(user).then(u => {
    //       this.navCtrl.setRoot(ConnectPage, {}, { animate: true });
    //       })
    //     } else {
    //       this.navCtrl.setRoot(HomePage, {}, { animate: true });
    //     }
    //   })
    // }, 1000);
    this.authSubscription = this.user.getAuthState().subscribe((user: any) => {
      if (user) {
        this.user.getOrCreateUser(user).then(() => {
          this.navCtrl.setRoot(ConnectPage);
        });
      } else {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  ionViewWillLeave() {
    this.authSubscription.unsubscribe();
  }

}