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

	redireciona_foto(){
		let dataImage = 'data:image/gif;base64,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';
		this.navCtrl.push(FotoTiradaPage,{foto:dataImage,uid:this.uid});
	}
	/**
	 * Função que chama a câmera para tirar uma foto e envia esta para
	 * uma página modal para tomada de decisão (enviar/cancelar)
	 * 
	 * @param <galeria> Variavel boolean, deve ser <TRUE> para quando a fonte
	 * da foto for da galeria, ou deve ser <FALSE> quando o usuário quiser tirar
	 * uma nova foto com sua câmera
	 */
	
	testar_api(){
		let loading = this.loadingCtrl.create({
				content: 'Enviando...'
			});
		loading.present();
		let body = {
	    		imagem: 'data:image/gif;base64,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',
				texto: 'TEXTO TESTE22222',
				resolvido: false,
				// Adicionado hora do servidor no formato UNIX TIMESTAMP
				data: timestamp,
				// Adicionado hora com valor negativo para facilitar ordenação
				data_invertida: timestamp//(-1 * new Date().getTime())
				//data: now.getDate()+"/"+(1+now.getMonth())+"/"+now.getFullYear()+" ~~ "+now.getHours()+":"+now.getMinutes()	
			};
		// Realiza o push de informações no banco
		var promise = firebaseDatabase.ref('reports/cp/').push(body);
		// Recupera o timestamp do servidor e modifica o body
		promise.on('value', function(snapshot) {
			body.data_invertida = snapshot.val().data_invertida * -1;
		});
		// Atualiza post com data invertida
		firebaseDatabase.ref('reports/cp/' + promise.key).update({ data_invertida: body.data_invertida }).then(
			() => {
				loading.dismiss();
				// Toast
				let toast = this.toastCtrl.create({
					message: 'Report enviado!',
					duration: 3000,
					position: 'top'
				});
				// Mostra mensagem
				toast.present();
			}, (err) => {
				loading.dismiss();
				// Toast
				let toast = this.toastCtrl.create({
					message: 'Erro ao enviar report!',
					duration: 3000,
					position: 'top'
				});
				// Mostra mensagem
				toast.present();
			}
		);
	}

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
