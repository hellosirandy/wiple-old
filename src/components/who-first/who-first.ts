import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UserProvider } from '../../providers/providers';

@Component({
  selector: 'who-first',
  templateUrl: 'who-first.html'
})
export class WhoFirstComponent implements OnChanges {
  @Input() firstUser;
  @Input() secondUser;
  @Input() selected: string;
  @Output() switch = new EventEmitter<void>();

  private firstProfilePic: string='';
  private secondProfilePic: string='';

  constructor(
    public user: UserProvider
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.firstUser && changes.firstUser.currentValue !== changes.firstUser.previousValue) {
      this.firstProfilePic = this.user.getProfilePic(this.firstUser, 'large');
    }
    if (changes.secondUser && changes.secondUser.currentValue !== changes.secondUser.previousValue) {
      this.secondProfilePic = this.user.getProfilePic(this.secondUser, 'large');
    }
    if (changes.selected && changes.selected.currentValue !== changes.selected.previousValue) {
      
    }
  }
  
  handleImgClick(witch: 'first'|'second') {
    if (witch !== this.selected) {
      this.switch.emit();
    }
  }

}
