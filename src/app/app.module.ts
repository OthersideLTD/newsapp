import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

import { environment } from '../environments/environment';

import { MyApp } from './app.component';
import { PopoverPage } from '../pages/popover/popover';
import { DPpopoverPage } from '../pages/d-ppopover/d-ppopover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SuperTabsModule } from 'ionic2-super-tabs';

import { AuthProvider } from '../providers/auth/auth';
import { NewsApiProvider } from '../providers/news-api/news-api';


@NgModule({
  declarations: [
    MyApp,
    PopoverPage,
    DPpopoverPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,\
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverPage,
    DPpopoverPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    Facebook,
    AuthProvider,
    NewsApiProvider,
  ]
})
export class AppModule {}
