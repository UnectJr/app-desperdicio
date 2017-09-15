import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
// Http
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { firebaseDatabase } from '../../app/firebase.config'
import * as firebase from "firebase"; 
var storageRef = firebase.storage().ref();

@IonicPage()
@Component({
	selector: 'page-foto-tirada',
	templateUrl: 'foto-tirada.html',
})
export class FotoTiradaPage {

	/**
	 * Texto para descrição da imagem
	 */
	public texto: string;

	/**
	 * Foto como string de base 64
	 */
	public base64_image: string;

	/**
	 * URL raiz da api
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
	public url_api = "reports/cp/";

	/**
	 * Construtor da página. Carrega a foto tirada pela câmera
	 */
	constructor(public navCtrl: NavController, public navParams: NavParams,
		public loadingCtrl: LoadingController, public toastCtrl: ToastController,
		public http: Http) {
		this.base64_image = this.navParams.get('foto');
	}

	/**
	 * Função que envia as informações do usuário (foto, texto) para api
	 */
	enviar() {
		if(this.base64_image !== undefined){
			// Mostra uma mensagem de carregamento enquanto envia mensagem p/ api
			let loading = this.loadingCtrl.create({
				content: 'Enviando...'
			});
			loading.present();
			console.log("Enviando report...");
			// Cria um cabeçalho
			//let headers = new Headers({ 'Content-Type': 'application/json' });
			// Chave unica do report
			//var key = firebaseDatabase.ref().child('cp').push().key;
			// Firebase storage
			/*var storage_cp = storageRef.child(key+'.jpg');
			storage_cp.putString(this.base64_image, 'base64').then(function(snapshot) {
  					console.log('Uploaded a base64 string!');
			});*/
	    	// Faz a chamada JS para a api
			var now = new Date;
			// Cria um corpo para a mensagem (JSON oom foto e texto)
			let body = {
	    		imagem: this.base64_image,
				texto: this.texto,
				resolvido: false,
				data: now.getDate()+"/"+(1+now.getMonth())+"/"+now.getFullYear()	
			};
			// Faz o commit no banco de dados
			var key = firebaseDatabase.ref().child('cp').push().key;
			firebaseDatabase.ref( this.url_api + key ).set(body);
			loading.dismiss();

			// Chamada HTTP para a api
			/*this.http.post(encodeURI(this.url_root + this.url_api),JSON.stringify(body), headers).map(res => res.json())
			.subscribe(
				data => {
					// Termina mensagem de carregamento
					loading.dismiss();
					// Mostra resposta no console
		            let resposta = data.resultado;
		            console.log(resposta);
		            // Apresenta resposta de sucesso ao usuário
	            	let toast = this.toastCtrl.create({
						message: `Report enviado!`,
						duration: 3000,
						position: 'top'
					});
					// Quando toast termina seu tempo, a navegação volta para home
					toast.onDidDismiss(() => {
						this.navCtrl.pop();
					});
					toast.present();
	        	},
	        	err => {
	        		// Termina mensagem de carregamento
					loading.dismiss();
					// Resultado no console
					console.log("Erro ao tentar enviar report!");
					// Apresenta resposta de falha ao usuário
					let toast = this.toastCtrl.create({
						message: `Erro ao tentar enviar report!`,
						duration: 3000,
						position: 'top'
					});
					// Quando toast termina seu tempo, a navegação volta para home
					toast.onDidDismiss(() => {
						this.navCtrl.pop();
					});
					toast.present();
				}
        	);*/
		}
	}

	/**
	 * Função para cancelar o envio do alerta. Volta para home
	 */
	cancelar() {
		this.navCtrl.pop();
	}

}
