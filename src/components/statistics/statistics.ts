import { Component } from '@angular/core';
import { TimeProvider } from '../../providers/time/time';
@Component({
  selector: 'statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsComponent {
  timeIntervalTypes: 'year'|'month'|'day';
  timeInterval: string='year';

  constructor(
    public time: TimeProvider,
  ) {
    
  }

  switchType(type: string) {
    this.timeInterval = type;
  }

}
