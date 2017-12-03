import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ViewController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoupleProvider, ExpenseProvider, UserProvider, TimeProvider } from '../../providers/providers';
import { Expense } from '../../models/models';

@Component({
  selector: 'page-new-expense',
  templateUrl: 'new-expense.html',
})
export class NewExpensePage implements OnInit {
  public together: boolean=true;
  public expenseCategory: 'food'|'entertainment'|'shopping'|'transit'='entertainment';

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
  private firstProfilePic;
  private secondProfilePic;
  private firstExpense: number=0;
  private secondExpense: number=0;

  private amountType: ''|'same'|'diff'='';
  private payType: 'allpay'|'firstpay'|'firsttreat'|'secondpay'|'secondtreat'='allpay';
  private mobile: boolean=false;
  private opacity: 0|1=1;
  private amountSubmitTried: boolean=false;

  constructor(
    public couple: CoupleProvider,
    public expense: ExpenseProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public plt: Platform,
    public time: TimeProvider,
    public loadingCtrl: LoadingController,
    public user: UserProvider,
    public viewCtrl: ViewController,
  ) {
    this.coupleKey = navParams.get('coupleKey');
    this.mobile = plt.is('mobile');
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
    if (this.plt.is('ios')) {
      this.viewCtrl.setBackButtonText('Cancel');
    }
  }

  ionViewWillUnload() {
    this.coupleSub.unsubscribe();
  }

  ngOnInit() {
    this.desForm = new FormGroup({
      'description': new FormControl(null, Validators.required)
    });
    this.amountForm = new FormGroup({
      'same': new FormGroup({
        'sameAmount': new FormControl(null, Validators.required),
      }),
      'diff': new FormGroup({
        'amountFirst': new FormControl(null, Validators.required),
        'amountSecond': new FormControl(null, Validators.required)
      })
    })
  }

  desSubmit() {
    this.submitTried = true;
    if (this.desForm.valid) {
      this.description = this.desForm.get('description').value;
      this.phase = 2;
      this.setAnimation();
      this.firstProfilePic = this.user.getProfilePic(this.firstUser);
      this.secondProfilePic = this.user.getProfilePic(this.secondUser);
    }
  }

  amountSubmit() {
    this.amountSubmitTried = true;
    if (this.amountType === 'same' && this.amountForm.get('same').valid) {
      const amount = Number(this.amountForm.get('same.sameAmount').value);
      this.firstExpense = amount / 2;
      this.secondExpense = amount / 2;
      this.setAnimation();
      this.phase = 3;
    } else if (this.amountType === 'diff' && this.amountForm.get('diff').valid) {
      this.firstExpense = Number(this.amountForm.get('diff.amountFirst').value);
      this.secondExpense = Number(this.amountForm.get('diff.amountSecond').value);
      this.setAnimation();
      this.phase = 3;
    }
  }

  getPhase3ButtonColor(payType) {
    return payType === this.payType ? 'wiple-pink' : 'wiple-light-pink';
  }

  saveExpense() {
    const newExpense = new Expense(
      this.together, 
      this.expenseCategory,
      this.description, 
      this.firstExpense, 
      this.secondExpense,
      this.payType,
      (new Date).getTime()
    );
    const loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Saving expense...'
    });
    loading.present();
    this.expense.newExpense(this.coupleKey, newExpense).then(_ => {
      loading.dismiss();
      this.navCtrl.pop();
    });
  }

  handleBackClick() {
    this.phase--;
  }

  setAnimation() {
    this.opacity = 0;
    setTimeout(() => {
      this.opacity = 1;
    }, 100);
  }

}
