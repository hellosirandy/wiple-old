import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Expense, TimeInterval } from '../../models/models';
import { DisplayExpensePage } from '../../pages/display-expense/display-expense';
@Component({
  selector: 'mobile-integrate-stats',
  templateUrl: 'mobile-integrate-stats.html'
})
export class MobileIntegrateStatsComponent {
  @ViewChild('parent') parentDiv: ElementRef;
  @Input() expenses: Expense[]=[];
  @Input() timeInterval: TimeInterval;

  constructor(
    public navCtrl: NavController,
  ) {
    
  }

  handleExpenseClick(expense) {
    this.navCtrl.push(DisplayExpensePage, { expense: expense });
  }
  
}
