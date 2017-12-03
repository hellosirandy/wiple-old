import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ExpenseProvider, UserProvider } from '../../providers/providers';
import { Expense } from '../../models/models';

@Component({
  selector: 'mobile-switch-bar',
  templateUrl: 'mobile-switch-bar.html'
})
export class MobileSwitchBarComponent implements OnChanges {
  @Input() firstUser;
  @Input() secondUser;
  @Input() select: 'first'|'second'|'expense'='expense';
  @Input() expenses: Expense[]=[];
  @Output('switchMobileSelect') switch = new EventEmitter<'first'|'second'|'expense'>();
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
    if (changes.expenses && changes.expenses.currentValue !== changes.expenses.previousValue) {
      this.amountCaculated = 0;
      this.totalAmount = this.expense.getTotalAmount(changes.expenses.currentValue);
      if (!changes.expenses.firstChange) {
        setTimeout(() => {
          this.amountCaculated = 1;
        }, 100);
      }
    }
    if (changes.firstUser && changes.firstUser.currentValue !== changes.firstUser.previousValue) {
      this.firstProfilePic = this.user.getProfilePic(changes.firstUser.currentValue);
    }
    if (changes.secondUser && changes.secondUser.currentValue !== changes.secondUser.previousValue) {
      this.secondProfilePic = this.user.getProfilePic(changes.secondUser.currentValue);
    }
    
  }

  switchMobileSelect(select: 'first'|'second'|'expense') {
    if (this.select !== select) {
      this.switch.emit(select);
    }
  }

}
