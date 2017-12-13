import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { Expense } from '../../models/models';
import { ExpenseProvider } from '../../providers/providers';
import { DisplayExpensePage } from '../../pages/display-expense/display-expense';

@Component({
  selector: 'expense-item',
  templateUrl: 'expense-item.html'
})
export class ExpenseItemComponent implements OnInit {
  @Input('expense') exp: Expense;
  private opacity: 0|1=0;
  private mobile: boolean=false;

  constructor(
    public expense: ExpenseProvider,
    public modalCtrl: ModalController,
    plt: Platform
  ) {
    this.mobile = plt.is('mobile');
  }

  ngOnInit() {
    setTimeout(() => {
      this.opacity = 1;
    }, 100);
  }

  handleExpenseClick() {
    const modal = this.modalCtrl.create(DisplayExpensePage, { expense: this.exp });
    modal.present();
  }

}
