import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FotoTiradaPage } from '../pages/foto-tirada/foto-tirada';
// Camera
import { Camera } from '@ionic-native/camera';
// Network
import { Network } from '@ionic-native/network';
// Http
import { HttpModule } from '@angular/http';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FotoTiradaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FotoTiradaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityServiceProvider
  ]
})
export class AppModule {}
