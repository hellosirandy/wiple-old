import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class TimeProvider {

  constructor() {
    
  }

  getCurrentTime(type: 'year'|'month'|'day') {
    if (type === 'year') {
      return moment().format('YYYY');
    } else if (type === 'month') {
      return moment().format('YYYY/MM');
    } else if (type === 'day') {
      return moment().format('YYYY/MM/DD');
    }
  }

  getFormatTime(time: number) {
    return moment(time).format('YYYY/MM/DD');
  }

}
