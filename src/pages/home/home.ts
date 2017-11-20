import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';

import { SigninPage } from '../signin/signin';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private backgroundImage: string='url(/assets/imgs/cover-hor.png)';

  constructor(
    public navCtrl: NavController,
    public user: UserProvider,
    public plt: Platform,
  ) {
    this.backgroundImage = 'url(/assets/imgs/cover-' + (plt.isLandscape() ? 'hor' : 'ver') + '.png)';
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
