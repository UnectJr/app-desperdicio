import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User){
    try{
    const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
    if(result){
      this.navCtrl.setRoot(HomePage);
    }
    }catch(e){
      let mensagem:string;
      switch(e.code){
        case 'auth/argument-error':{
          mensagem = `Por favor preencha os campos email e senha.`;
          break;
        }
        case 'auth/invalid-email':{
          mensagem = `Email inválido.`;
          break;
        }
        case 'auth/user-not-found':{
          mensagem = `Usuário não encontrado.`;
          break;
        }
      }
      this.toastCtrl.create({
				message: mensagem,
				duration: 3000
,			}).present();
    }
  }

  registrar(){
    this.navCtrl.push(RegisterPage);
  }

  esqueciMinhaSenha(){
    this.navCtrl.push(RecuperarSenhaPage);
  }
}
