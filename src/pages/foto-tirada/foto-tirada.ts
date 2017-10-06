import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
// Http
import 'rxjs/add/operator/map';
import { firebaseDatabase, timestamp } from '../../app/firebase.config'

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
		public loadingCtrl: LoadingController, public toastCtrl: ToastController,) {
		this.base64_image = this.navParams.get('foto');
	}

	/**
	 * Função que envia as informações do usuário (foto, texto) para api
	 */
	enviar() {
		// Se a imagem for indefinida (não existir) não executa envio
		if(this.base64_image !== undefined){
			// Mostra uma mensagem de carregamento enquanto envia mensagem p/ api
			let loading = this.loadingCtrl.create({
				content: 'Enviando...'
			});
			loading.present();
			console.log("Enviando report...");
			// Cria um corpo para a mensagem (JSON oom foto e texto)
			let body = {
	    		imagem: this.base64_image,
				texto: this.texto,
				resolvido: false,
				// Adicionado hora do servidor no formato UNIX TIMESTAMP
				data: timestamp
				//data: now.getDate()+"/"+(1+now.getMonth())+"/"+now.getFullYear()+" ~~ "+now.getHours()+":"+now.getMinutes()	
			};
			// Faz o commit no banco de dados
			// Adicionado ".then" e notação de seta para tratar problemas
			firebaseDatabase.ref( this.url_api ).push(body).then( () => {
				// .then é usado para quando efetuar ação
				// O primeiro parâmetro de .then é para quando der certo
				// Tira carregamento
				loading.dismiss();
				// Mostra toast de sucesso
				let toast = this.toastCtrl.create({
					message: 'Report enviado!',
					duration: 3000,
					position: 'top'
				});
				// Quando toast termina seu tempo a navegação volta para home
				toast.onDidDismiss(() => {
					this.navCtrl.pop();
				});
				// Mostra mensagem
				toast.present();
				console.log('Report enviado!');
			}, (err) => {// Caso dê errado
				// O segundo parâmetro de .then é usado para quando der erro
				// Fecha janela de loading quando é feita requisição
				loading.dismiss();
				// Apresenta resposta de erro ao usuário
            	let toast = this.toastCtrl.create({
					message: 'Erro ao enviar report!',
					duration: 3000,
					position: 'top'
				});
				// Quando toast termina seu tempo a navegação volta para home
				toast.onDidDismiss(() => {
					this.navCtrl.pop();
				});
				// Mostra mensagem
				toast.present();
			});
		}
	}

	/**
	 * Função para cancelar o envio do alerta. Volta para home
	 */
	cancelar() {
		this.navCtrl.pop();
	}

}
