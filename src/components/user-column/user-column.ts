import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'user-column',
  templateUrl: 'user-column.html'
})
export class UserColumnComponent implements OnChanges {
  @Input('user') columnUser;
  constructor(
    public user: UserProvider
  ) {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  getProfilePic() {
    const pic = this.user.getProfilePic(this.columnUser);
    return pic;
  }

}
