import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { CoupleProvider, ExpenseProvider, UserProvider } from '../../providers/providers';
import { Couple, Expense, User } from '../../models/models';
import { DatepickerOptions } from 'ng2-datepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-wiple-pay',
  templateUrl: 'wiple-pay.html',
})
export class WiplePayPage implements OnInit {
  private firstUser: User;
  private secondUser: User;
  private firstProfilePic: string='';
  private secondProfilePic: string='';
  private coupleKey: string;
  private wiplePayForm: FormGroup;
  private submitTried: boolean=false;
  private wiple: Expense;

  public datepickerOptions: DatepickerOptions = {
    minYear: 1970,
    maxYear: new Date().getFullYear()+1,
    displayFormat: 'YYYY/MM/DD',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0,
  };

  constructor(
    public couple: CoupleProvider,
    public expense: ExpenseProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: UserProvider,
  ) {
    this.coupleKey = navParams.get('coupleKey');
    const exp = navParams.get('expense');
    if (exp) {
      this.wiple = exp
    } else {
      this.wiple = new Expense(true, "else", '', 0, 0, 0, 0, 'wiple', Date.now());
    }
  }

  ionViewDidLoad() {
    const sub = this.couple.getCouple(this.coupleKey).subscribe((couple: Couple) => {
      sub.unsubscribe();
      const firstSub = this.user.getPartner(couple.first).subscribe((user: User) => {
        firstSub.unsubscribe();
        this.firstUser = user;
        this.firstProfilePic = this.user.getProfilePic(user, 'large');
      });
      const secondSub = this.user.getPartner(couple.second).subscribe((user: User) => {
        secondSub.unsubscribe();
        this.secondUser = user;
        this.secondProfilePic = this.user.getProfilePic(user, 'large');
      });
    });
  }

  ngOnInit() {
    const amount = this.wiple.firstPaid + this.wiple.secondPaid;
    const pay = this.wiple.secondPaid > 0 ? 'second' : 'first';
    this.wiplePayForm = new FormGroup({
      'description': new FormControl(this.wiple.description, null),
      'date': new FormControl(this.wiple.dateTime, Validators.required),
      'amount': new FormControl(amount !== 0 ? amount : null, Validators.required),
      'pay': new FormControl(pay, Validators.required)
    });
  }

  handleTransitionClick() {
    const item = this.wiplePayForm.get('pay');
    if (item.value === 'first') {
      item.setValue('second');
    } else {
      item.setValue('first');
    }
  }

  onSubmit() {
    this.submitTried = true;
    if (this.wiplePayForm.valid) {
      const loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Wipling...'
      });
      loading.present();
      let description = this.wiplePayForm.get('description').value;
      const amount = Number(this.wiplePayForm.get('amount').value);
      let firstExpense, firstPaid, secondExpense, secondPaid;
      if (this.wiplePayForm.get('pay').value === 'first') {
        firstExpense = 0;
        firstPaid = amount;
        secondExpense = amount;
        secondPaid = 0;
      } else {
        firstExpense = amount;
        firstPaid = 0;
        secondExpense = 0;
        secondPaid = amount;
      }
      description = this.wiplePayForm.get('description').value ? this.wiplePayForm.get('description').value : 'Wiple Pay';
      this.wiple.description = description;
      this.wiple.firstExpense = firstExpense;
      this.wiple.secondExpense = secondExpense;
      this.wiple.firstPaid = firstPaid;
      this.wiple.secondPaid = secondPaid;
      let promise;
      if (this.navParams.get('expense')) {
        promise = this.expense.updateExpense(this.coupleKey, this.wiple);
      } else {
        promise = this.expense.newExpense(this.coupleKey, this.wiple);
      }
      promise.then(_ => {
        loading.dismiss();
        this.navCtrl.pop();
      });
    }
  }

}
