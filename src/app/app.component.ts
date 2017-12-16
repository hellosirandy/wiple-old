import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { InitialPage } from '../pages/initial/initial';
import { ProfilePage } from '../pages/profile/profile';
import { DebtsPage } from '../pages/debts/debts';
import { UserProvider } from '../providers/user/user';
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = InitialPage;
  private currentUser;
  private coupleKey: string;

  constructor(
    public events: Events,
    platform: Platform, 
    public user: UserProvider,
    // statusBar: StatusBar, 
    // splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
    });
  }

  ngOnInit() {
    this.events.subscribe('user:login', () => {
      this.user.getCurrentUser().then(obs => {
        obs.subscribe(cu => {
          this.currentUser = cu;
          this.coupleKey = cu.couple;
        })
      });
    });
  }

  handleProfileClick() {
    this.nav.push(ProfilePage);
  }

  handleDebtsClick() {
    this.nav.push(DebtsPage, { coupleKey: this.coupleKey });
  }

  handleSignoutClick() {
    this.user.signout().then(_ => {
      this.nav.setRoot(InitialPage, {}, {animate: true});
    })
  }
}

