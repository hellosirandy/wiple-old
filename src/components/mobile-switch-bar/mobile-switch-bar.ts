import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ExpenseProvider, UserProvider } from '../../providers/providers';
import { Expense, MobileStatsDisplay } from '../../models/models';

@Component({
  selector: 'mobile-switch-bar',
  templateUrl: 'mobile-switch-bar.html'
})
export class MobileSwitchBarComponent implements OnChanges {
  @Input() firstUser;
  @Input() secondUser;
  @Input() select: MobileStatsDisplay='integrate';
  @Input() expenses: Expense[]=[];
  @Output('switchMobileSelect') switch = new EventEmitter<MobileStatsDisplay>();
  private firstProfilePic: string='';
  private secondProfilePic: string='';

  private totalAmount: number=0;
  public amountCaculated: 0|1=1;

  constructor(
    public expense: ExpenseProvider,
    public user: UserProvider,
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.expenses && changes.expenses.currentValue !== changes.expenses.previousValue) || 
    changes.select && changes.select.currentValue !== changes.select.previousValue) {
      this.amountCaculated = 0;
      const expenses = changes.expenses ? changes.expenses.currentValue : this.expenses;
      const select = changes.select ? changes.select.currentValue : this.select;
      this.totalAmount = this.expense.getTotalAmount(expenses, select);
      setTimeout(() => {
        this.amountCaculated = 1;
      }, 100);
    }
    if (changes.firstUser && changes.firstUser.currentValue !== changes.firstUser.previousValue) {
      this.firstProfilePic = this.user.getProfilePic(changes.firstUser.currentValue);
    }
    if (changes.secondUser && changes.secondUser.currentValue !== changes.secondUser.previousValue) {
      this.secondProfilePic = this.user.getProfilePic(changes.secondUser.currentValue);
    }
    
  }

  switchMobileSelect(select: MobileStatsDisplay) {
    if (this.select !== select) {
      this.switch.emit(select);
    }
  }

}
