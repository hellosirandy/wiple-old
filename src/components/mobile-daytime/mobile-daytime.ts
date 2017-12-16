import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeProvider } from '../../providers/providers';
import { TimeInterval } from '../../models/models';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'mobile-daytime',
  templateUrl: 'mobile-daytime.html'
})
export class MobileDaytimeComponent {
  @Input() timeInterval: string='year';
  @Output() switchTimeInterval = new EventEmitter<any>();

  public datepickerOptions: DatepickerOptions = {
    minYear: 1970,
    maxYear: new Date().getFullYear()+1,
    displayFormat: 'YYYY/MM',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0,
  };
  public dateTime = Date.now();

  constructor(
    public time: TimeProvider,
  ) {
    
  }

  switchType(type: TimeInterval=null) {
    if (type) {
      this.timeInterval = type;
      if (type === 'year') {
        this.datepickerOptions = {
          minYear: 1970,
          maxYear: new Date().getFullYear()+1,
          displayFormat: 'YYYY',
          barTitleFormat: 'MMMM YYYY',
          firstCalendarDay: 0
        };
      } else if (type === 'month') {
        this.datepickerOptions = {
          minYear: 1970,
          maxYear: new Date().getFullYear()+1,
          displayFormat: 'YYYY/MM',
          barTitleFormat: 'MMMM YYYY',
          firstCalendarDay: 0
        };
      } else {
        this.datepickerOptions = {
          minYear: 1970,
          maxYear: new Date().getFullYear()+1,
          displayFormat: 'YYYY/MM/DD',
          barTitleFormat: 'MMMM YYYY',
          firstCalendarDay: 0
        };
      }
    }
    this.switchTimeInterval.emit({
      timeInterval: this.timeInterval, 
      selectedTime: new Date(this.dateTime).getTime()}
    );
  }

}
