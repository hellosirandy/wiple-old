import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserProvider } from '../../providers/providers';

@Component({
  selector: 'who-first',
  templateUrl: 'who-first.html'
})
export class WhoFirstComponent implements OnChanges {
  @Input() firstUser;
  @Input() secondUser;

  private firstProfilePic: string='';
  private secondProfilePic: string='';

  constructor(
    public user: UserProvider
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.firstUser && changes.firstUser.currentValue !== changes.firstUser.previousValue) {
      this.firstProfilePic = this.user.getProfilePic(this.firstUser);
    }
    if (changes.secondUser && changes.secondUser.currentValue !== changes.secondUser.previousValue) {
      this.secondProfilePic = this.user.getProfilePic(this.secondUser);
    }
  }

}
