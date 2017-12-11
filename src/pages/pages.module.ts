import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home/home';
import { SigninPage } from './signin/signin';
import { SignupPage } from './signup/signup';
import { ConnectPage } from './connect/connect';
import { ProfilePage } from './profile/profile';
import { MainAppPage } from './main-app/main-app';
import { UserPopoverPage } from './user-popover/user-popover';
import { DebtsPage } from './debts/debts';
import { EditExpensePage } from './edit-expense/edit-expense';
import { DisplayExpensePage } from './display-expense/display-expense';
import { WiplePayPage } from './wiple-pay/wiple-pay';

import { ComponentsModule } from '../components/components.module';
import { NgDatepickerModule } from 'ng2-datepicker';

@NgModule({
	declarations: [
    HomePage,
    SigninPage,
    SignupPage,
    ConnectPage,
    ProfilePage,
    MainAppPage,
    UserPopoverPage,
    DebtsPage,
		EditExpensePage,
    DisplayExpensePage,
    WiplePayPage
	],
	imports: [
		IonicPageModule.forChild(HomePage),
    IonicPageModule.forChild(SigninPage),
    IonicPageModule.forChild(SignupPage),
    IonicPageModule.forChild(ConnectPage),
    IonicPageModule.forChild(ProfilePage),
    IonicPageModule.forChild(MainAppPage),
    IonicPageModule.forChild(UserPopoverPage),
    IonicPageModule.forChild(DebtsPage),
    IonicPageModule.forChild(EditExpensePage),
    IonicPageModule.forChild(DisplayExpensePage),
    IonicPageModule.forChild(WiplePayPage),
    ComponentsModule,
    NgDatepickerModule,
	],
	exports: [
    HomePage,
    SigninPage,
    SignupPage,
    ConnectPage,
    ProfilePage,
    MainAppPage,
    UserPopoverPage,
    DebtsPage,
		EditExpensePage,
    DisplayExpensePage,
    WiplePayPage
	],
	providers: [
		
	]
})
export class PagesModule {}
