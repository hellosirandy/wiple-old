import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomPage } from './welcom';

@NgModule({
  declarations: [
    WelcomPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomPage),
  ],
})
export class WelcomPageModule {}
