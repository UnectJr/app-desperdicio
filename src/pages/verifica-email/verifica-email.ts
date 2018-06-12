import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseDatabase } from '../../app/firebase.config';
/**
 * Generated class for the VerificaEmailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifica-email',
  templateUrl: 'verifica-email.html',
})
export class VerificaEmailPage {

  constructor(private toastCtrl:ToastController ,private afauth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  voltarLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  reenviar(){
    this.afauth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        data.sendEmailVerification();

        // Toast
        let toast = this.toastCtrl.create({
          message: 'Confirmação de email reenviada.',
          duration: 3000,
          position: 'top'
        });
        // Quando toast termina seu tempo a navegação volta para home
        toast.onDidDismiss(() => {
          this.navCtrl.setRoot(LoginPage);
        });
        // Mostra mensagem
        toast.present();
      }
    });
  }

}
