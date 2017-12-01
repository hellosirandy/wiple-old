import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { InitialPage } from '../initial/initial';
import { User } from '../../models/user';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private currentUser: User;
  private currentUserKey: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
    this.user.getCurrentUser().then(user => {
      this.currentUser = user;
      return this.user.getCurrentUserKey();
    }).then(userKey => {
      this.currentUserKey = userKey;
      
    });
  }

  ionViewWillLeave() {

  }

  signout() {
    this.user.signout().then(() => {
      this.navCtrl.setRoot(InitialPage, {}, {animate: true});
    });
  }

  breakup() {
    this.user.breakup().then(_ => {});
  }

}
