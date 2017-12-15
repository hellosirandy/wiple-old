import { NgModule } from '@angular/core';
import { InappNavbarComponent } from './inapp-navbar/inapp-navbar';
import { IonicPageModule } from 'ionic-angular';
import { UserColumnComponent } from './user-column/user-column';
import { RadioButtonComponent } from './radio-button/radio-button';
import { CategoryIconComponent } from './category-icon/category-icon';
import { MobileDaytimeComponent } from './mobile-daytime/mobile-daytime';
import { MobileSwitchBarComponent } from './mobile-switch-bar/mobile-switch-bar';
import { ExpenseItemComponent } from './expense-item/expense-item';
import { MobileIntegrateStatsComponent } from './mobile-integrate-stats/mobile-integrate-stats';
import { ChartModule } from 'angular2-highcharts';
import { EditExpensePhaseOneComponent } from './edit-expense-phase-one/edit-expense-phase-one';
import { EditExpensePhaseTwoComponent } from './edit-expense-phase-two/edit-expense-phase-two';
import { EditExpensePhaseThreeComponent } from './edit-expense-phase-three/edit-expense-phase-three';
import { NgDatepickerModule } from 'ng2-datepicker';
import { WhoFirstComponent } from './who-first/who-first';
import { PcStatsComponent } from './pc-stats/pc-stats';
import { StatsContentComponent } from './stats-content/stats-content';
import { CategoryItemComponent } from './category-item/category-item';
import { UserColumnContentComponent } from './user-column-content/user-column-content';

@NgModule({
	declarations: [
		InappNavbarComponent,
        UserColumnComponent,
        RadioButtonComponent,
        CategoryIconComponent,
        MobileDaytimeComponent,
        MobileSwitchBarComponent,
        ExpenseItemComponent,
        MobileIntegrateStatsComponent,
    EditExpensePhaseOneComponent,
    EditExpensePhaseTwoComponent,
    EditExpensePhaseThreeComponent,
    WhoFirstComponent,
    PcStatsComponent,
    StatsContentComponent,
    CategoryItemComponent,
    UserColumnContentComponent,
	],
	imports: [
        IonicPageModule.forChild(InappNavbarComponent),
        ChartModule,
        NgDatepickerModule
	],
	exports: [
		InappNavbarComponent,
        UserColumnComponent,
        RadioButtonComponent,
        CategoryIconComponent,
        MobileDaytimeComponent,
        MobileSwitchBarComponent,
        ExpenseItemComponent,
        MobileIntegrateStatsComponent,
    EditExpensePhaseOneComponent,
    EditExpensePhaseTwoComponent,
    EditExpensePhaseThreeComponent,
    WhoFirstComponent,
    PcStatsComponent,
    StatsContentComponent,
    CategoryItemComponent,
    UserColumnContentComponent,
	]
})
export class ComponentsModule {}
