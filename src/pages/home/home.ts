import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';

import { SigninPage } from '../signin/signin';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private backgroundImage: string='url(/assets/imgs/cover-hor.png)';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public user: UserProvider,
    public plt: Platform,
    public toastCtrl: ToastController,
  ) {
    this.backgroundImage = 'url(/assets/imgs/cover-' + (plt.isLandscape() ? 'hor' : 'ver') + '.png)';
  }

  ionViewDidLoad() {
  }

  signout() {
    this.user.signout();
  }

  goSignin() {
    this.navCtrl.push(SigninPage);
  }

}
