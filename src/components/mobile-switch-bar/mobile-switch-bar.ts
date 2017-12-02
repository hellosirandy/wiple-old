import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProvider } from '../../providers/providers';

@Component({
  selector: 'mobile-switch-bar',
  templateUrl: 'mobile-switch-bar.html'
})
export class MobileSwitchBarComponent {
  @Input() firstUser;
  @Input() secondUser;
  @Input() select: 'first'|'second'|'expense'='expense';
  @Output('switchMobileSelect') switch = new EventEmitter<'first'|'second'|'expense'>();

  constructor(
    public user: UserProvider,
  ) {
    
  }

  switchMobileSelect(select: 'first'|'second'|'expense') {
    if (this.select !== select) {
      this.switch.emit(select);
    }
  }

}
