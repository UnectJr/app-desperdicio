import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
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
    const result = this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
    if(result){
      this.navCtrl.push(HomePage);
    }
    }catch(e){
      console.error(e);
      if(e.toJSON.code === "auth/user-not-found"){
        this.toastCtrl.create({
					message: `Usuário ou senha não encontrado.`,
					duration: 3000
,				}).present();
      }
    }
  }

  registrar(){
    this.navCtrl.push(RegisterPage);
  }
}
