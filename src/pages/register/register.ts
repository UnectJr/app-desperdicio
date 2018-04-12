import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;


  constructor(private afauth: AngularFireAuth, public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  async registrar(user: User){
    try{
      const result = await this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password);
      if(result){
        // Toast
        let toast = this.toastCtrl.create({
          message: 'Usuário criado com sucesso!',
          duration: 3000,
          position: 'top'
        });
        // Quando toast termina seu tempo a navegação volta para home
        toast.onDidDismiss(() => {
          this.navCtrl.push(LoginPage);
        });
        // Mostra mensagem
        toast.present();
      }
    }
    catch(e){
      console.error(e);
    }
  }

}
