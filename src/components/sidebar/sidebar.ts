import { Component, EventEmitter, Output } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { InitialPage } from '../../pages/initial/initial';
import { ProfilePage } from '../../pages/profile/profile';

@Component({
  selector: 'sidebar',
  templateUrl: 'sidebar.html'
})
export class SidebarComponent {
  @Output() profileClick = new EventEmitter<void>();

  constructor(
    public user: UserProvider,
  ) {

  }

  handleProfileClick() {
    console.log('profile');
    
  }

  handleDebtsClick() {

  }

  handleSignoutClick() {
    // console.log('signout');
    // this.user.signout().then(() => {
    //   this.navCtrl.setRoot(InitialPage, {}, {animate: true});
    // });
  }

}
