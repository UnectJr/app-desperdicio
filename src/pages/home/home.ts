import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// Ionic native camera
import { Camera } from '@ionic-native/camera';
// Toast: pequena mensagem que salta na tela
import { ToastController, LoadingController } from 'ionic-angular';
// Páginas
import { FotoTiradaPage } from '../foto-tirada/foto-tirada';
// Firebase
import {firebaseDatabase} from '../../app/firebase.config';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})


export class HomePage {

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
	constructor(public navCtrl: NavController, private camera: Camera,
		private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
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
		var now = new Date;
		let body = {
	    		imagem: 'IMAGEM TESTE',
				texto: 'TEXTO TESTE22222',
				resolvido: false,
				data: now.getDate()+"/"+(1+now.getMonth())+"/"+now.getFullYear()	
			};
		var key = firebaseDatabase.ref().child('cp').push().key;
		firebaseDatabase.ref('reports/cp/'+key).set(body, function(err){
			if(err){
				console.log("Erro ao enviar report!");
			}
			else{
				console.log("Report enviado com sucesso!");
			}
		});
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
