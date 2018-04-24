import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { firebaseDatabase } from '../../app/firebase.config'
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


	/**
	 * URL raiz da api (para chamadas HTTP a uma api REST -- não é necessário quando usando Firebase)
	 * 
	 * Para rodar app em um dispositivo com:
	 * 		-> ionic run
	 * usar endereço real da api, exemplo: http://dominio-app.com/index.php
	 * 
	 * Para testar o app usando:
	 * 		-> ionic serve
	 * 		-> ionic run -l 	(testanto num dispositivo com livereload)
	 * usar proxy: http://localhost:8100/api para contornar problema com CORS
	 * 
	 * Para configurar o proxy basta alterar variável "proxyUrl" dentro de "proxies" no 
	 * arquivo ionic.config.json que está na raiz do projeto. Colocar nele o endereço
	 * real da api
	 * 
	 */
	public url_root = "https://app-agua-utfpr.firebaseio.com/"

	/**
	 * Rota da api para deploy das informações (imagem, texto)
	 */
	public url_api = "users/cp/";



  constructor(private afauth: AngularFireAuth, public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  async registrar(user: User){
    try{
      if(user.firstName != null && user.lastName != null && user.RA != null){
        const result = await this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password);
        if(result){

          let body = {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            RA: this.user.RA,
            email: this.user.email,
            uid: result.uid,
            tipo: 1
          }

          firebaseDatabase.ref(this.url_api).child(result.uid).set(body);

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
      }else{
        throw new Error('missing-arguments');
      }
    }
    catch(e){
      console.error(e);
      let mensagem:string;
      if(e.code){
        switch(e.code){
          case 'auth/argument-error':{
            mensagem = 'Por favor preencher todos os parametros.';
            break;
          }
          case 'auth/email-already-in-use':{
            mensagem = 'Email já cadastrado.';
            break;
          }
        }
      }else{
        mensagem = 'Por favor preencha todos os campos.';
      }

      this.toastCtrl.create({
        message: mensagem,
        duration: 3000
      }).present();
    }
  }

  voltar(){
    this.navCtrl.pop();
  }

}
