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
import { MobileIntegrateStatsComponent } from './mobile-integrate-stats/mobile-integrate-stats';
import { ChartModule } from 'angular2-highcharts';

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
        MobileIntegrateStatsComponent,
	],
	imports: [
        IonicPageModule.forChild(InappNavbarComponent),
        ChartModule,
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
        MobileIntegrateStatsComponent,
	]
})
export class ComponentsModule {}
