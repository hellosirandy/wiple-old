import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/Storage';

import { MyApp } from './app.component';
import { InitialPage } from '../pages/initial/initial';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ConnectPage } from '../pages/connect/connect';
import { ProfilePage } from '../pages/profile/profile';
import { MainAppPage } from '../pages/main-app/main-app';
import { UserPopoverPage } from '../pages/user-popover/user-popover';
import { DebtsPage } from '../pages/debts/debts';
import { NewExpensePage } from '../pages/new-expense/new-expense';

import { ComponentsModule } from '../components/components.module';

import { ApiProvider } from '../providers/api/api';
import { UserProvider } from '../providers/user/user';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ConnectionProvider } from '../providers/connection/connection';
import { TimeProvider } from '../providers/time/time';
import { CoupleProvider } from '../providers/couple/couple';

const firebaseConfig = {
  apiKey: "AIzaSyAZKpuq_JyzecKn1tEP8EnwoqRSX02R-fA",
  authDomain: "wiple-33ca8.firebaseapp.com",
  databaseURL: "https://wiple-33ca8.firebaseio.com",
  projectId: "wiple-33ca8",
  storageBucket: "wiple-33ca8.appspot.com",
  messagingSenderId: "539587021284"
}

@NgModule({
  declarations: [
    MyApp,
    InitialPage,
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
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, 'wiple'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InitialPage,
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
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    UserProvider,
    ConnectionProvider,
    TimeProvider,
    CoupleProvider
  ]
})
export class AppModule {}
