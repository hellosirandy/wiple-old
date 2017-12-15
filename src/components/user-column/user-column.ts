import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { Expense } from '../../models/models';

@Component({
  selector: 'user-column',
  templateUrl: 'user-column.html'
})
export class UserColumnComponent implements OnChanges {
  @Input('user') columnUser;
  @Input() expenses: Expense[]=[];
  @Input() position: 'first'|'second';

  private profilePic: string='';
  constructor(
    public user: UserProvider
  ) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.columnUser && changes.columnUser.currentValue !== changes.columnUser.previousValue) {
      this.profilePic = this.user.getProfilePic(changes.columnUser.currentValue, 'large');
    }
  }

}
