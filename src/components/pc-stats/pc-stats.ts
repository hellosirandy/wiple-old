import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ChartProvider, ExpenseProvider, TimeProvider } from '../../providers/providers';
import { Expense, TimeInterval } from '../../models/models';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'pc-stats',
  templateUrl: 'pc-stats.html'
})
export class PcStatsComponent implements OnChanges, OnInit {
  @ViewChild('expensesArea') parentDiv: ElementRef;
  @ViewChild('content') content: ElementRef;
  @Input() timeInterval: string='year';
  @Input() expenses: Expense[]=[];
  @Output() switchTimeInterval = new EventEmitter<any>();
  private totalAmount: number=0;
  public amountCaculated: 0|1=1;
  private contentHeight: number=0;
  public datepickerOptions: DatepickerOptions = {
    minYear: 1970,
    maxYear: new Date().getFullYear()+1,
    displayFormat: 'YYYY/MM',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0,
  };
  public dateTime = Date.now();

  constructor(
    public chart: ChartProvider,
    public expense: ExpenseProvider,
    public time: TimeProvider,
  ) {
    
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenses && changes.expenses.currentValue !== changes.expenses.previousValue) {
      this.amountCaculated = 0;
      this.totalAmount = this.expense.getTotalAmount(changes.expenses.currentValue, 'integrate');
      if (!changes.expenses.firstChange) {
        setTimeout(() => {
          this.amountCaculated = 1;
        }, 100);
      }
      this.contentHeight = window.innerHeight - this.content.nativeElement.getBoundingClientRect().top-5;
    }
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
