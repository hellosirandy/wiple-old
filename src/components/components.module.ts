import { NgModule } from '@angular/core';
import { InappNavbarComponent } from './inapp-navbar/inapp-navbar';
import { IonicPageModule } from 'ionic-angular';
import { SidenenuComponent } from './sidenenu/sidenenu';

@NgModule({
	declarations: [InappNavbarComponent,
    SidenenuComponent],
	imports: [
		IonicPageModule.forChild(InappNavbarComponent),
	],
	exports: [InappNavbarComponent,
    SidenenuComponent]
})
export class ComponentsModule {}
