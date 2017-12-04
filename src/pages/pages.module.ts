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
import { NewExpensePage } from './new-expense/new-expense';
import { ComponentsModule } from '../components/components.module';

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
    NewExpensePage
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
    IonicPageModule.forChild(NewExpensePage),
    ComponentsModule,
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
    NewExpensePage
	],
	providers: [
		
	]
})
export class PagesModule {}
