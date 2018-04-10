import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FotoTiradaPage } from '../pages/foto-tirada/foto-tirada';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
// Camera
import { Camera } from '@ionic-native/camera';
// Http
import { HttpModule } from '@angular/http';
//AngularFire2
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from "angularfire2/auth";
import { firebaseConfig } from './firebase.config';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FotoTiradaPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FotoTiradaPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
