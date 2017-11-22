import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage implements OnInit {
  private searchForm: FormGroup;
  private submitTried: boolean=false;
  private boyImage: string='/assets/imgs/boy.svg';
  private foundUserPhoto: string;
  private foundUserName: string;
  private status: any={ form: 'form', found: 'found', notfound: 'notfound', sent: 'sent', agree: 'agree' };
  private inputSection: string=this.status.form;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'email': new FormControl(null, Validators.email)
    });
  }

  onSubmit() {
    this.submitTried = true;
    if (this.searchForm.valid) {
      const email = this.searchForm.get('email').value;
      const searchSubscription = this.user.searchUser(email).subscribe((user: User) => {
        console.log(user);
        if (user) {
          this.foundUserPhoto = user.photoURL ? user.photoURL : this.boyImage;
          this.foundUserName = user.displayName;
          this.inputSection = this.status.found;
        } else {
          this.inputSection = this.status.notfound;
        }
        this.submitTried = false;
        this.searchForm.reset();
        searchSubscription.unsubscribe();
      });
    }
  }
  
  handleTryOtherClick() {
    this.inputSection = this.status.form;
    this.foundUserPhoto = null;
  }
}
