import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeProvider } from '../../providers/providers';

@Component({
  selector: 'mobile-daytime',
  templateUrl: 'mobile-daytime.html'
})
export class MobileDaytimeComponent {
  @Input() timeInterval: string='year';
  @Output() switchTimeInterval = new EventEmitter<'year'|'month'|'day'>();

  constructor(
    public time: TimeProvider,
  ) {
    
  }

  switchType(type: 'year'|'month'|'day') {
    this.switchTimeInterval.emit(type);
  }

}
