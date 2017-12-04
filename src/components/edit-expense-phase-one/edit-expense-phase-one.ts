import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeProvider } from '../../providers/providers';
import { ExpenseCategory } from '../../models/models';

@Component({
  selector: 'edit-expense-phase-one',
  templateUrl: 'edit-expense-phase-one.html'
})
export class EditExpensePhaseOneComponent implements OnInit {
  @Input() expenseCategory: ExpenseCategory;
  @Input() description: string;
  @Output() desSubmit = new EventEmitter<any>();

  private opacity: 0|1=0;
  private day: string='';
  public expenseTypes: ExpenseCategory[]=['food', 'entertainment', 'transit', 'shopping', 
  'love', 'life', 'rent', 'gift', 'coffee', 'else'];

  private desForm: FormGroup;
  private submitTried: boolean=false;
  private expCat: ExpenseCategory;

  constructor(
    public time: TimeProvider
  ) {
  }

  ngOnInit() {
    this.expCat = this.expenseCategory;
    this.day = this.time.getCurrentTime('day');
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
        expenseCategory: this.expCat
      });
    }
  }

}
