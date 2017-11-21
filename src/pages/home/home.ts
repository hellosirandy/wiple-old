import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';

import { SigninPage } from '../signin/signin';
import { ConnectPage } from '../connect/connect';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private backgroundImage: string='url(/assets/imgs/cover-hor.png)';

  constructor(
    public navCtrl: NavController,
    public user: UserProvider,
    public plt: Platform,
  ) {
    this.backgroundImage = 'url(/assets/imgs/cover-' + (plt.isLandscape() ? 'hor' : 'ver') + '.png)';
  }

  ngOnInit() {
    this.user.getCurrentUser().then(user => {
      if (user) {
        this.navCtrl.setRoot(ConnectPage);
        console.log(user);
      }
    })
  }

  signout() {
    this.user.signout();
  }

  goSignin() {
    this.navCtrl.push(SigninPage);
  }

}
