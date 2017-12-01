import { NgModule } from '@angular/core';
import { InappNavbarComponent } from './inapp-navbar/inapp-navbar';
import { SidebarComponent } from './sidebar/sidebar';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [
		InappNavbarComponent,
		SidebarComponent
	],
	imports: [
		IonicPageModule.forChild(InappNavbarComponent),
		IonicPageModule.forChild(SidebarComponent),
	],
	exports: [
		InappNavbarComponent,
		SidebarComponent
	]
})
export class ComponentsModule {}
