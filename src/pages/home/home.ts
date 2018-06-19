import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// Ionic native camera
import { Camera } from '@ionic-native/camera';
// Toast: pequena mensagem que salta na tela
import { ToastController, LoadingController } from 'ionic-angular';
// Páginas
import { FotoTiradaPage } from '../foto-tirada/foto-tirada';
// Firebase
import { firebaseDatabase, timestamp } from '../../app/firebase.config';
// AngularFire2Auth
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { VerificaEmailPage } from '../verifica-email/verifica-email';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})


export class HomePage {
	uid: string;
	user = {} as User;
	
	/**
	 * Rota da api para deploy das informações
	 */
	public url_api = "users/cp/";

	/**
	 * Constante que define largura em pixels da foto
	 */
	private largura_foto = 1000;

	/**
	 * Constante que define altura em pixels da foto
	 */
	private altura_foto = 1000;

	/**
	 * Método construtor. Instancia NavController, Camera e ToastController para uso
	 */
	constructor(private afauth: AngularFireAuth,public navCtrl: NavController, private camera: Camera,
		public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
			this.afauth.authState.subscribe(data => {
				if(data && data.email && data.uid){
					this.uid = data.uid;
					firebaseDatabase.ref(this.url_api+ data.uid).once('value').then(
						(res) => {
							delete this.user.password;
							this.user = res.val();

							if(data.emailVerified){
								toastCtrl.create({
									message: 'Logado como '+this.user.firstName+" "+this.user.lastName+".",
									duration: 3000
								}).present();
							}else{
								this.navCtrl.setRoot(VerificaEmailPage);
							}							
						}
					);
				}
			});
	}
	/**
	 * Função que chama a câmera para tirar uma foto e envia esta para
	 * uma página modal para tomada de decisão (enviar/cancelar)
	 * 
	 * @param <galeria> Variavel boolean, deve ser <TRUE> para quando a fonte
	 * da foto for da galeria, ou deve ser <FALSE> quando o usuário quiser tirar
	 * uma nova foto com sua câmera
	 */
	capturar_foto(galeria) {
		// Apresenta mensagem de carregamento
		let loading = this.loadingCtrl.create({
			content: 'Carregando...'
		});
		loading.present();
		// Fonte da fonto (local de onde se tira a foto: câmera ou galeria)
		let fonte_foto;
		
		if(galeria === false) {
			// Caso opte por tirar uma foto, a fonte passa a ser a câmera
			fonte_foto = this.camera.PictureSourceType.CAMERA;
			console.log("Foto da câmera: " + fonte_foto);
		}
		else {
			// Se o usuário decidir puxar uma foto da galeria, esta passa a ser a
			// fonte. Isso permite a pesquisa da foto na galeria do celular
			fonte_foto = this.camera.PictureSourceType.PHOTOLIBRARY;
			console.log("Foto da galeria: " + fonte_foto);
		}
		// Função de Camera para escolher uma foto (tirada na hora ou da galeria)
		this.camera.getPicture({
			sourceType: fonte_foto,
	        destinationType: this.camera.DestinationType.DATA_URL,
	        targetWidth: this.largura_foto,
	        targetHeight: this.altura_foto
	    }).then((imageData) => {
	    	// Termina mensagem de carregamento
			loading.dismiss();
	    	// Envia foto para próxima página
	        this.navCtrl.push(FotoTiradaPage, {
				foto: "data:image/jpeg;base64," + imageData
				,uid:this.uid
			});
	    }, (err) => {
	    	// Termina mensagem de carregamento
			loading.dismiss();
	    	// Caso haja um erro mostra um Toast
	    	let toast = this.toastCtrl.create({
				message: 'Erro ao tentar capturar foto',
				duration: 3000,
				position: 'top'
			});
			toast.present();
	        console.log(err);
	    });
	}

}
