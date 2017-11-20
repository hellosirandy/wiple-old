import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/providers';
import { ConnectPage } from '../connect/connect';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  private signupForm: FormGroup;
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
    this.signupForm = new FormGroup({
      'email': new FormControl(null, Validators.email),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, [Validators.required, this.validatePassword.bind(this)]),
      'displayName': new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    this.submitTried = true;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const displayName = this.signupForm.get('displayName').value;
    if (this.signupForm.valid) {
      this.user.signupWithEmail(email, password, displayName).then(() => {
        this.navCtrl.setRoot(ConnectPage);
      }).catch(err => {
        this.errorMessage = err.message;
      });
    }
  }

  signinWithFacebook() {
    this.user.signinWithFacebook().then(() => {
      this.navCtrl.setRoot(ConnectPage);
    });
  }

  validatePassword(): { [s: string]: boolean } {
    if (this.signupForm && this.signupForm.get('password').value !== this.signupForm.get('confirmPassword').value) {
      return { 'Different with password': true };
    }
    return null;
  }

}
