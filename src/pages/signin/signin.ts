import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { InitialPage } from '../initial/initial';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  private signinForm: FormGroup;
  private submitTried: boolean=false;
  private errorMessage: string;

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
    this.submitTried = true;
    if (this.signinForm.valid) {
      const email = this.signinForm.get('email').value;
      const password = this.signinForm.get('password').value;
      this.user.signinWithEmail(email, password).then(() => {
        this.navCtrl.setRoot(InitialPage);
      }).catch(err => {
        this.errorMessage = err.message;
      });
    }
  }
  
  signinWithFacebook() {
    this.user.signinWithFacebook().then(() => {
      this.navCtrl.setRoot(InitialPage);
    });
  }
  
  goSignup() {
    this.navCtrl.push(SignupPage);
  }

}
