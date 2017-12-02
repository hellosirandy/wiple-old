import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoupleProvider, UserProvider, TimeProvider } from '../../providers/providers';

@Component({
  selector: 'page-new-expense',
  templateUrl: 'new-expense.html',
})
export class NewExpensePage implements OnInit {
  private together: boolean=true;
  private expenseCategory: 'food'|'entertainment'|'merchandise'|'transit'='food';

  private desForm: FormGroup;
  private amountForm: FormGroup;
  private submitTried: boolean=false;

  private description: string='';
  
  private phase: 1|2|3=1;

  private cp;
  private coupleKey: string='';
  private coupleSub;

  private firstUser;
  private secondUser;
  private firstExpense: number=0;
  private secondExpense: number=0;

  private amountType: ''|'same'|'diff'='';
  private payType: 'allpay'|'firstpay'|'firsttreat'|'secondpay'|'secondtreat'='allpay';

  constructor(
    public couple: CoupleProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public time: TimeProvider,
    public user: UserProvider,
  ) {
    this.coupleKey = navParams.get('coupleKey');
  }

  ionViewDidLoad() {
    this.coupleSub = this.couple.getCouple(this.coupleKey).subscribe((cp: any) => {
      this.cp = cp;
      const sub1 = this.user.getPartner(cp.first).subscribe(pn => {
        this.firstUser = pn;
        sub1.unsubscribe();
      });
      const sub2 = this.user.getPartner(cp.second).subscribe(pn => {
        this.secondUser = pn;
        sub2.unsubscribe();
      });
    });
  }

  ionViewWillUnload() {
    this.coupleSub.unsubscribe();
  }

  ngOnInit() {
    this.desForm = new FormGroup({
      'description': new FormControl(null, Validators.required)
    });
    this.amountForm = new FormGroup({
      'same-amount': new FormControl(0),
      'amount-1': new FormControl(0),
      'amount-2': new FormControl(0)
    })
  }

  onSubmit() {
    this.submitTried = true;
    if (this.desForm.valid) {
      this.description = this.desForm.get('description').value;
      this.phase = 2;
    }
  }

  amountSubmit() {
    if (this.amountType === 'same') {
      const amount = this.amountForm.get('same-amount').value;
      this.firstExpense = amount / 2;
      this.secondExpense = amount / 2;
    } else {
      this.firstExpense = this.amountForm.get('amount-1').value;
      this.secondExpense = this.amountForm.get('amount-2').value;
    }
    this.phase = 3;
  }

  getPhase3ButtonColor(payType) {
    return payType === this.payType ? 'wiple-pink' : 'wiple-light-pink';
  }

}
