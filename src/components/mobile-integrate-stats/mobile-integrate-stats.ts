import { Component, Input } from '@angular/core';
import { Expense } from '../../models/models';

@Component({
  selector: 'mobile-integrate-stats',
  templateUrl: 'mobile-integrate-stats.html'
})
export class MobileIntegrateStatsComponent {
  @Input() expenses: Expense[]=[];

  constructor() {
  }

}
