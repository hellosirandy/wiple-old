import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PayType } from '../../models/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/providers';

@Component({
  selector: 'edit-expense-phase-three',
  templateUrl: 'edit-expense-phase-three.html'
})
export class EditExpensePhaseThreeComponent implements OnChanges, OnInit {
  @Input() firstUser;
  @Input() secondUser;
  @Input() firstExpense: number=0;
  @Input() secondExpense: number=0;
  @Output() goBack = new EventEmitter<void>();
  @Output() expenseSubmit = new EventEmitter<any>();

  private firstProfilePic: string;
  private secondProfilePic: string;

  private selectedPayType: 'allpay'|'treat'|'payfirst'|'custom'='allpay';

  private opacity: 0|1=0;
  private form: FormGroup;
  private totalAmount: number=0;

  private firstPaid: number=0;
  private secondPaid: number=0;

  constructor(
    public user: UserProvider
  ) {
    
  }

  ngOnInit() {
    setTimeout(() => {
      this.opacity = 1;
    }, 100);
    this.totalAmount = this.firstExpense + this.secondExpense;
    this.firstPaid = this.firstExpense;
    this.secondPaid = this.secondExpense;
    this.form = new FormGroup({
      'treat': new FormGroup({
        'which': new FormControl('first', Validators.required)
      }),
      'payfirst': new FormGroup({
        'which': new FormControl('first', Validators.required)
      }),
      'custom': new FormGroup({
        'first': new FormControl(this.firstExpense, Validators.required),
        'second': new FormControl(this.secondExpense, Validators.required)
      })
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.firstUser && changes.firstUser.currentValue !== changes.firstUser.previousValue) {
      this.firstProfilePic = this.user.getProfilePic(this.firstUser, 'large');
    }
    if (changes.secondUser && changes.secondUser.currentValue !== changes.secondUser.previousValue) {
      this.secondProfilePic = this.user.getProfilePic(this.secondUser, 'large');
    }
  }

  handleBackClick() {
    this.opacity = 0;
    setTimeout(() => {
      this.goBack.emit();
    }, 500);
  }

  switch(formGroupName: 'treat'|'payfirst') {
    const value = this.form.get(`${formGroupName}.which`).value === 'first' ? 'second' : 'first';
    this.form.get(`${formGroupName}.which`).setValue(value);
    this.updateAmount();
  }

  updatePayType(payType) {
    this.selectedPayType = payType;
    this.updateAmount();
  }

  updateAmount() {
    if (this.selectedPayType === 'allpay') {
      this.firstPaid = this.firstExpense;
      this.secondPaid = this.secondExpense;
    } else if (this.selectedPayType === 'treat' || this.selectedPayType === 'payfirst') {
      const value = this.form.get(`${this.selectedPayType}.which`).value;
      if (value === 'first') {
        this.firstPaid = this.totalAmount;
        this.secondPaid = 0;
      } else {
        this.secondPaid = this.totalAmount;
        this.firstPaid = 0;
      }
    } else if (this.selectedPayType === 'custom') {
      this.firstPaid = this.form.get('custom.first').value;
      this.secondPaid = this.form.get('custom.second').value;
    }
  }

  customOnchange(value, which: 'first'|'second') {
    const first = this.form.get('custom.first');
    const second = this.form.get('custom.second');
    if (which === 'first') {
      if (first.value > this.totalAmount) {
        first.setValue(this.totalAmount);
      }
      second.setValue(this.totalAmount - first.value);
    } else {
      if (second.value > this.totalAmount) {
        second.setValue(this.totalAmount);
      }
      first.setValue(this.totalAmount - first.value);
    }
    this.updateAmount();
  }

  onSubmit() {
    this.expenseSubmit.emit({
      payType: this.selectedPayType,
      firstPaid: Number(this.firstPaid),
      secondPaid: Number(this.secondPaid)
    });
  }

}
