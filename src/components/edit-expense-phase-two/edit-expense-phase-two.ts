import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/providers';

@Component({
  selector: 'edit-expense-phase-two',
  templateUrl: 'edit-expense-phase-two.html'
})
export class EditExpensePhaseTwoComponent implements OnInit {
  @Output() goBack = new EventEmitter<void>();
  @Output() amountSubmit = new EventEmitter<any>();
  @Input() firstProfilePic;
  @Input() secondProfilePic;
  @Input() amountType: 'same'|'diff';
  @Input() firstExpense: number;
  @Input() secondExpense: number;
  private opacity: 0|1=0;

  private amountForm: FormGroup;
  private submitTried: boolean=false;

  constructor(
    public user: UserProvider,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.opacity = 1;
    }, 100);
    this.amountForm = new FormGroup({
      'same': new FormGroup({
        'amount': new FormControl(this.firstExpense+this.secondExpense > 0 ? this.firstExpense+this.secondExpense : null, Validators.required)
      }),
      'diff': new FormGroup({
        'amount-first': new FormControl(this.firstExpense > 0 ? this.firstExpense : null, Validators.required),
        'amount-second': new FormControl(this.secondExpense > 0 ? this.secondExpense : null, Validators.required)
      })
    });
  }

  handleBackClick() {
    this.opacity = 0;
    setTimeout(() => {
      this.goBack.emit();
    }, 500);
  }

  onSubmit() {
    this.submitTried = true;
    if (this.amountType === 'same' && this.amountForm.get('same').valid) {
      this.amountSubmit.emit({
        amountType: this.amountType,
        firstExpense: Number(this.amountForm.get('same.amount').value)/2,
        secondExpense: Number(this.amountForm.get('same.amount').value)/2
      });
    } else if (this.amountType === 'diff' && this.amountForm.get('diff').valid) {
      this.amountSubmit.emit({
        amountType: this.amountType,
        firstExpense: Number(this.amountForm.get('diff.amount-first').value),
        secondExpense: Number(this.amountForm.get('diff.amount-second').value),
      });
    }
  }
}
