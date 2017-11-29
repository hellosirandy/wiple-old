import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { ProfilePage } from '../../pages/profile/profile';

@Component({
  selector: 'inapp-navbar',
  templateUrl: 'inapp-navbar.html'
})
export class InappNavbarComponent {
  
  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
  ) {
  }

  handleProfileClick() {
    this.navCtrl.push(ProfilePage);
  }

  handleMenuClick() {
    this.menuCtrl.open();
  }

}
