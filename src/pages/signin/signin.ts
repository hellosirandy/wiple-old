import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectPage } from '../connect/connect';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  private signinForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, Validators.email),
      'password': new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const email = this.signinForm.get('email').value;
      const password = this.signinForm.get('password').value;
      this.user.signinWithEmail(email, password).then(() => {
        this.navCtrl.setRoot(ConnectPage);
      });
    }
  }
  
  signinWithFacebook() {
    this.user.signinWithFacebook().then(() => {
      this.navCtrl.setRoot(ConnectPage);
    });
  }

}
