import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { ConnectionProvider } from '../../providers/connection/connection';
import { User } from '../../models/user';
import { MainAppPage } from '../main-app/main-app';
import { Invitation } from '../../models/invitation';

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage implements OnInit {
  private pageTitle: string='Get Connection With Your Love!';
  private searchForm: FormGroup;
  private submitTried: boolean=false;
  private boyImage: string='/assets/imgs/boy.svg';
  private foundUser: User;
  private foundUserKey: string;
  private currentUser: User;
  private status: any={ form: 'form', found: 'found', notfound: 'notfound', sent: 'sent', agree: 'agree' };
  private inputSection: string;
  private currentUserKey: string;
  private invitationSubscription;
  private partnerSubscription;
  private inviter: User;
  private currentInvitation: Invitation;
  private currentInvitationKey: string;

  constructor(
    public connection: ConnectionProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
    this.user.getCurrentUser().then(user => {
      this.currentUser = user;
      return this.user.getCurrentUserKey()
    }).then(userKey => {
      this.currentUserKey = userKey;
      this.invitationSubscription = this.connection.getInvitations(userKey).subscribe((invitations: any) => {
        if (invitations && invitations.length > 0) {
          const inv = <Invitation>invitations[0].payload.val();
          this.currentInvitation = inv;
          this.currentInvitationKey = invitations[0].key;
          if (inv.invitee === this.currentUserKey) {
            this.searchUser('key', inv.inviter);
            this.inputSection = this.status.agree;
          } else if (inv.inviter === this.currentUserKey) {
            this.searchUser('key', inv.invitee);
            this.inputSection = this.status.sent;
          }
          const subscription = this.user.searchUser('key', inv.inviter).subscribe(inviter => {
            this.inviter = <User>inviter.payload.val();
            subscription.unsubscribe();
          });
        } else {
          this.handleTryOtherClick();
        }
        
      });
      this.partnerSubscription = this.user.getPartner(userKey).subscribe(partner => {
        if (partner) {
          this.user.refreshUser(this.currentUserKey).then(_ => {
            this.navCtrl.setRoot(MainAppPage, {}, {animate: true})
          })
        }
      })
    });

  }

  ionViewWillLeave() {
    this.invitationSubscription.unsubscribe();
    this.partnerSubscription.unsubscribe();
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
      this.searchUser('email', email);
    }
  }

  searchUser(type: 'key' | 'email', value: string) {
    const subscription = this.user.searchUser(type, value).subscribe(user => {
      if (user) {
        this.foundUser = <User>user.payload.val();
        this.foundUserKey = user.key;
        this.foundUser.photoURL = this.foundUser.photoURL ? this.foundUser.photoURL : this.boyImage;
        if (type === 'email') {
          this.inputSection = this.status.found;
        } 
      } else {
        this.inputSection = this.status.notfound;
      }
      this.submitTried = false;
      this.searchForm.reset();
      subscription.unsubscribe();
    })
  }
  
  handleTryOtherClick() {
    this.inputSection = this.status.form;
    this.foundUser = null;
  }

  handleSendClick() {
    this.connection.sendInvitation(this.currentUserKey, this.foundUserKey).then(_ => {

    });
  }

  declineInvitation() {
    this.connection.removeInvitation(this.foundUserKey, this.currentUserKey).then(_ => {
    })
  }

  cancelInvitation() {
    this.connection.removeInvitation(this.currentUserKey, this.foundUserKey).then(_ => {
    })
  }

  acceptInvitation() {
    this.connection.acceptInvitation(this.currentUserKey, this.foundUserKey).then(_ => {
    });
  }
}
