import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RecuperarSenhaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  email:string;
  message:string;

  constructor(private afAuth:AngularFireAuth,private toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  recuperarSenha(){
    try{
      this.afAuth.auth.sendPasswordResetEmail(this.email)
        .then(() => {
          let toast = this.toastCtrl.create({
            message: "Mensagem enviada para o email.",
            duration: 3000
          });

          toast.onDidDismiss(() => {
            this.navCtrl.pop();
          });

          toast.present();
        });
    }catch(e){
      this.criaToast(e.code);
    }
    
  }

  criaToast(email:string){
    switch(email){
      case 'auth/invalid-email':
        this.message = "Erro - Email inválido.";
        break;
      case 'auth/user-not-found':
        this.message = "Erro - Usuário não encontrado.";
        break;
      case 'auth/argument-error':
        this.message = "Erro - Parametros inválidos.";
        break;
      default:
        this.message = "Erro - Contate o suporte.";
        break;
    }

    this.toastCtrl.create({
      message: this.message,
      duration: 3000
    }).present();
  }
}
