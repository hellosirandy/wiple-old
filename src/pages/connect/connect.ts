import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { ConnectionProvider } from '../../providers/connection/connection';
import { Invitation } from '../../models/invitation';
import { InitialPage } from '../initial/initial';

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage implements OnInit {
  private displayType = {search: 'search', found: 'found', notfound: 'notfound', sent: 'sent', received: 'received'}
  private display: string=this.displayType.search;

  private searchForm: FormGroup;
  private submitTried: boolean=false;


  private foundUser;
  private foundUserKey: string;
  private currentUser;

  private sentInv: Invitation[]=[];
  private receivedInv: Invitation[]=[];
  private invitations: any[]=[];

  private sentSub;
  private receivedSub;
  private currentUserSub;

  constructor(
    public connection: ConnectionProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
  }

  ionViewDidLoad() {
    this.user.getCurrentUser().then(obs => {
      this.currentUserSub = obs.subscribe(cu => {
        this.currentUser = cu;
        if (cu.couple) {
          this.navCtrl.setRoot(InitialPage, {}, {animate: true});
        } else {
          this.connection.getInvitations('inviter').then(obs => {
            this.sentSub = obs.subscribe((inv: Invitation[]) => {
              this.sentInv = inv;
              this.updateInvs();
            });
            return this.connection.getInvitations('invitee')
          }).then(obs => {
            this.receivedSub = obs.subscribe((inv: Invitation[]) => {
              this.receivedInv = inv;
              this.updateInvs();
            });
          });
        }
      });
    });
  }
  
  ionViewWillLeave() {
    this.sentSub.unsubscribe();
    this.receivedSub.unsubscribe();
    this.currentUserSub.unsubscribe();
  }

  updateInvs() {
    const prevInvs: Invitation[]=this.invitations;
    this.invitations = this.sentInv.concat(this.receivedInv);
    if (this.invitations.length > 0) {
      if (prevInvs[0] !== this.invitations[0]) {
        if (this.sentInv.length > 0) {
          this.searchUser('key', this.invitations[0].invitee, this.displayType.sent);
        } else {
          this.searchUser('key', this.invitations[0].inviter, this.displayType.received);
        }
      }
    } else {
      this.handleTryOtherClick();
    }
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'email': new FormControl(null, Validators.email)
    });
  }

  onSubmit() {
    this.submitTried = true;
    if (this.searchForm.valid) {
      this.searchUser('email', this.searchForm.get('email').value, this.displayType.found);
    }
  }

  searchUser(type: 'key' | 'email', value: string, display: string) {
    const sub = this.user.searchUser(type, value).subscribe((user: any) => {
      if (user) {
        this.display = display;
        this.foundUser = user.payload.val();
        this.foundUserKey = user.key;
      } else {
        this.display = this.displayType.notfound;
      }
      
      sub.unsubscribe();
    });
  }
  
  handleTryOtherClick() {
    this.foundUser = null;
    this.searchForm.reset();
    this.submitTried = false;
    this.display = this.displayType.search;
  }

  handleSendClick() {
    this.connection.sendInvitation(this.foundUserKey).then(_ => {});
  }

  removeInvitation() {
    this.connection.removeInvitation(this.invitations[0].key).then(_ => {});
  }

  acceptInvitation() {
    this.connection.acceptInvitation(this.invitations[0].inviter).then(_ => {
      return this.removeInvitation();
    }).then(_ => {});
  }
}
