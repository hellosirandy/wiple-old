import { NgModule } from '@angular/core';
import { InappNavbarComponent } from './inapp-navbar/inapp-navbar';
import { IonicPageModule } from 'ionic-angular';
import { UserColumnComponent } from './user-column/user-column';
import { StatisticsComponent } from './statistics/statistics';
import { RadioButtonComponent } from './radio-button/radio-button';
import { CategoryIconComponent } from './category-icon/category-icon';
import { MobileDaytimeComponent } from './mobile-daytime/mobile-daytime';
import { MobileSwitchBarComponent } from './mobile-switch-bar/mobile-switch-bar';
import { ExpenseItemComponent } from './expense-item/expense-item';

@NgModule({
	declarations: [
		InappNavbarComponent,
    UserColumnComponent,
    StatisticsComponent,
    RadioButtonComponent,
    CategoryIconComponent,
    MobileDaytimeComponent,
    MobileSwitchBarComponent,
    ExpenseItemComponent,
	],
	imports: [
		IonicPageModule.forChild(InappNavbarComponent),
		IonicPageModule.forChild(UserColumnComponent),
	],
	exports: [
		InappNavbarComponent,
    UserColumnComponent,
    StatisticsComponent,
    RadioButtonComponent,
    CategoryIconComponent,
    MobileDaytimeComponent,
    MobileSwitchBarComponent,
    ExpenseItemComponent,
	]
})
export class ComponentsModule {}
