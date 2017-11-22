import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { InitialPage } from '../initial/initial';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
  }

  signout() {
    this.user.signout();
    this.navCtrl.setRoot(InitialPage, {signingOut: true}, {animate: true});
  }

}
