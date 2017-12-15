import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { ChartProvider, ExpenseProvider } from '../../providers/providers';
import { Expense, Particle, Piece } from '../../models/models';
import { DisplayExpensePage } from '../../pages/display-expense/display-expense';

@Component({
  selector: 'stats-content',
  templateUrl: 'stats-content.html'
})
export class StatsContentComponent implements OnChanges {
  @Input() parentDiv: ElementRef;
  @Input() expenses: Expense[];

  private chartOption;
  private pile: Particle[];

  private showingDetail: string;
  private mobile: boolean=false;

  constructor(
    public chart: ChartProvider,
    public expense: ExpenseProvider,
    public modalCtrl: ModalController,
    plt: Platform,
  ) {
    this.mobile = plt.is('mobile');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenses && changes.expenses.currentValue !== changes.expenses.previousValue && this.parentDiv) {
      if (changes.expenses.currentValue.length > 0) {
        const compileStats = this.expense.generateStats(changes.expenses.currentValue);
        const pie: Piece[]=compileStats.pie;
        this.pile = compileStats.pile;
        this.chartOption = this.chart.renderPieChart(pie, this.parentDiv);
      }
    }
  }

  handleCategoryClick(category: string) {
    this.showingDetail = this.showingDetail === category ? '' : category;
  }

  handleExpenseClick(exp: Expense) {
    const modal = this.modalCtrl.create(DisplayExpensePage, { expense: exp });
    modal.present();
  }

  getMaxHeight(category: string, length: number) {
    if (this.showingDetail === category) {
      return (this.mobile ? 32 : 40) * length + 'px';
    } else {
      return '0px';
    }
  }

}
