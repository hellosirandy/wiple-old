import { NgModule } from '@angular/core';
import { InappNavbarComponent } from './inapp-navbar/inapp-navbar';
import { IonicPageModule } from 'ionic-angular';
import { SidenenuComponent } from './sidenenu/sidenenu';
import { SidebarComponent } from './sidebar/sidebar';

@NgModule({
	declarations: [InappNavbarComponent,
    SidenenuComponent,
    SidebarComponent],
	imports: [
		IonicPageModule.forChild(InappNavbarComponent),
	],
	exports: [InappNavbarComponent,
    SidenenuComponent,
    SidebarComponent]
})
export class ComponentsModule {}
