import { Component, Input } from '@angular/core';
import { NavController, Platform, PopoverController } from 'ionic-angular';
import { UserPopoverPage } from '../../pages/user-popover/user-popover';
import { EditExpensePage } from '../../pages/edit-expense/edit-expense';
import { DebtsPage } from '../../pages/debts/debts';

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

  handleDebtsClick() {
    this.navCtrl.push(DebtsPage, { coupleKey: this.couple });
  }

  handleProfileClick(event) {
    const popover = this.popoverCtrl.create(UserPopoverPage);
    popover.present({
      ev: event
    });
  }

  handleNewExpenseClick() {
    this.navCtrl.push(EditExpensePage, {coupleKey: this.couple});
  }

}
