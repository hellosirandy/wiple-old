import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';

import { SigninPage } from '../signin/signin';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public user: UserProvider,
  ) {

  }

  signout() {
    this.user.signout();
  }

  goSignin() {
    this.navCtrl.push(SigninPage);
  }

  goSignup() {
    this.navCtrl.push(SignupPage);
  }

}
