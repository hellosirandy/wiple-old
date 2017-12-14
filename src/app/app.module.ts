import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/Storage';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { NgDatepickerModule } from 'ng2-datepicker';

import { MyApp } from './app.component';
import { InitialPage } from '../pages/initial/initial';
import { PagesModule } from '../pages/pages.module';

import { ComponentsModule } from '../components/components.module';

import { ApiProvider } from '../providers/api/api';
import { UserProvider } from '../providers/user/user';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ConnectionProvider } from '../providers/connection/connection';
import { TimeProvider } from '../providers/time/time';
import { CoupleProvider } from '../providers/couple/couple';
import { ExpenseProvider } from '../providers/expense/expense';

import { FirebaseConfig } from '../environments/environments';
import { ChartProvider } from '../providers/chart/chart';

declare var require: any;

export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);

  return hc;
}

@NgModule({
  declarations: [
    MyApp,
    InitialPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartModule,
    AngularFireModule.initializeApp(FirebaseConfig, 'wiple'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    ComponentsModule,
    PagesModule,
    NgDatepickerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InitialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    UserProvider,
    ConnectionProvider,
    TimeProvider,
    CoupleProvider,
    ExpenseProvider,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    ChartProvider
  ]
})
export class AppModule {}
