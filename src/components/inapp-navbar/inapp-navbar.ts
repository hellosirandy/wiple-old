import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../../pages/profile/profile';

@Component({
  selector: 'inapp-navbar',
  templateUrl: 'inapp-navbar.html'
})
export class InappNavbarComponent {
  
  constructor(
    public navCtrl: NavController,
  ) {
  }

  handleProfileClick() {
    this.navCtrl.push(ProfilePage);
  }

}
