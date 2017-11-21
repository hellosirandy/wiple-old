import { NgModule } from '@angular/core';
import { InappNavbarComponent } from './inapp-navbar/inapp-navbar';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [InappNavbarComponent],
	imports: [
		IonicPageModule.forChild(InappNavbarComponent),
	],
	exports: [InappNavbarComponent]
})
export class ComponentsModule {}
