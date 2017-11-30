import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../../pages/profile/profile';
import { InitialPage } from '../initial/initial';
import { UserProvider } from '../../providers/user/user';


@Component({
  selector: 'page-user-popover',
  templateUrl: 'user-popover.html',
})
export class UserPopoverPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
  }

  handleProfileClick() {
    this.navCtrl.push(ProfilePage);
  }

  handleSignoutClick() {
    this.user.signout().then(() => {
      this.navCtrl.setRoot(InitialPage, {}, {animate: true});
    });
  }

}
