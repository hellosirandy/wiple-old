import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseCategory } from '../../models/models';
import { NgDatepickerModule } from 'ng2-datepicker';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';

@Component({
  selector: 'edit-expense-phase-one',
  templateUrl: 'edit-expense-phase-one.html'
})
export class EditExpensePhaseOneComponent implements OnInit {
  @ViewChild('datepicker') datepicker;
  @Input() expenseCategory: ExpenseCategory;
  @Input() description: string;
  @Input() dateTime: number;
  @Output() desSubmit = new EventEmitter<any>();

  private opacity: 0|1=0;
  public expenseTypes: ExpenseCategory[]=['food', 'entertainment', 'transit', 'shopping', 
  'love', 'life', 'rent', 'gift', 'coffee', 'else'];

  private desForm: FormGroup;
  private submitTried: boolean=false;
  private expCat: ExpenseCategory;

  private datepickerOptions: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  };

  constructor(
  ) {
  }

  ngOnInit() {
    this.expCat = this.expenseCategory;
    this.desForm = new FormGroup({
      'description': new FormControl(this.description, Validators.required)
    });
    setTimeout(() => {
      this.opacity = 1;
    }, 100);
  }

  onSubmit() {
    this.submitTried = true;
    if (this.desForm.valid) {
      this.desSubmit.emit({
        description: this.desForm.get('description').value,
        expenseCategory: this.expCat,
        dateTime: new Date(this.dateTime).getTime()
      });
    }
  }

}
