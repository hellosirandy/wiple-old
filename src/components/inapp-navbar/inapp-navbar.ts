import { Component, Input } from '@angular/core';
import { NavController, Platform, PopoverController } from 'ionic-angular';
import { UserPopoverPage } from '../../pages/user-popover/user-popover';
import { NewExpensePage } from '../../pages/new-expense/new-expense';
import { EditExpensePage } from '../../pages/edit-expense/edit-expense';

@Component({
  selector: 'inapp-navbar',
  templateUrl: 'inapp-navbar.html'
})
export class InappNavbarComponent {
  @Input() couple: boolean=false;
  private mobile: boolean=false;
  
  constructor(
    public navCtrl: NavController,
    platform: Platform,
    public popoverCtrl: PopoverController,
  ) {
    this.mobile = platform.is('mobile');
  }

  handleProfileClick(event) {
    const popover = this.popoverCtrl.create(UserPopoverPage);
    popover.present({
      ev: event
    });
  }

  handleNewExpenseClick() {
    // this.navCtrl.push(NewExpensePage, {coupleKey: this.couple});
    this.navCtrl.push(EditExpensePage, {coupleKey: this.couple});
  }

}
