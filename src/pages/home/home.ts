import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';

import { SigninPage } from '../signin/signin';
import { ConnectPage } from '../connect/connect';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private backgroundImage: string='url(/assets/imgs/cover-hor.png)';
  private authSubscribe: Subscription;

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
    // if (this.plt.is('mobile')) {
    //   if (!this.navParams.get('signingOut')) {
    //     let toast = this.toastCtrl.create({
    //       message: 'Checking authentication ...',
    //       position: 'top'
    //     });
    //     toast.present();
    //     this.authSubscribe = this.user.getAuthState().subscribe(user => {
    //       let toastText;
    //       if (user) {
    //         this.navCtrl.setRoot(ConnectPage, {}, {
    //           animate: true,
    //         });
    //         toastText = 'You are now signed in.';
    //       } else {
    //         toastText = 'Please sign in or sign up first.';
    //       }
    //       toast.setMessage(toastText);
    //       setTimeout(() => {
    //         toast.dismiss();
    //       }, 2000);
    //     });
    //   }
      
    // } else {
    //   this.user.getCurrentUser().then(user => {
    //     if (user) {
    //       this.navCtrl.setRoot(ConnectPage, {}, {animate: true});
    //     }
    //   });
    // }
    
  }

  // ionViewWillLeave() {
  //   if (this.plt.is('mobile')) {
  //     this.authSubscribe.unsubscribe();
  //   }
  // }

  signout() {
    this.user.signout();
  }

  goSignin() {
    this.navCtrl.push(SigninPage);
  }

}
