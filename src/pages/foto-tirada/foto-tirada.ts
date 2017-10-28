import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
// Http
import 'rxjs/add/operator/map';
import { firebaseDatabase, timestamp } from '../../app/firebase.config'
// Network
import { Network } from '@ionic-native/network';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

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
	public url_api = "reports/cp/";

	/**
	 * Atributo booleano que indica se report já foi enviado
	 */
	public foto_enviada: boolean;

	/**
	 * Atributo para mostrar aviso de carregamento
	 */
	public loading;

	/**
	 * Watcher da rede
	 */
	public disconnectSubscription;

	/**
	 * Construtor da página. Carrega a foto tirada pela câmera
	 */
	constructor(public navCtrl: NavController, public navParams: NavParams,
		public loadingCtrl: LoadingController, public toastCtrl: ToastController,
		public network: Network, public connectivityService: ConnectivityServiceProvider) {
		this.base64_image = this.navParams.get('foto');
		this.texto = "";
		this.foto_enviada = false;
		this.loading = this.loadingCtrl.create({content: 'Enviando...'});
		// watch network for a disconnect
		this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
			this.sem_conexao();
		});
	}

	/**
	 * Função que envia as informações do usuário (foto, texto) para api
	 */
	enviar() {
		if(!this.connectivityService.isOnline()) {
			this.sem_conexao();
		}
		else if(this.connectivityService.isOnline() && !this.foto_enviada && this.base64_image !== undefined) {
			// Atualiza flag de envio do report para não permitir enviar duas vezes seguidas
			this.foto_enviada = true;
			// Mostra uma mensagem de carregamento enquanto envia mensagem p/ api
			this.loading.present();
			// Cria um corpo para a mensagem (JSON oom foto e texto)
			let body = {
	    		imagem: this.base64_image,
				texto: this.texto,
				resolvido: false,
				// Adicionado hora do servidor no formato UNIX TIMESTAMP
				data: timestamp,
				data_invertida: null
			};
			// Realiza o push de informações no banco
			var promise = firebaseDatabase.ref(this.url_api).push(body);
			// Recupera o timestamp do servidor e modifica o body
			promise.on('value', function(snapshot){
					body.data_invertida = snapshot.val().data * -1;
			});
			// Atualiza somente data_invertida do post com data invertida
			firebaseDatabase.ref(this.url_api + promise.key).update({ data_invertida: body.data_invertida }).then(
				() => {
					// stop disconnect watch
					this.disconnectSubscription.unsubscribe();
					this.loading.dismiss();
					// Toast
					let toast = this.toastCtrl.create({
						message: 'Report enviado!',
						duration: 3000,
						position: 'top'
					});
					// Quando toast termina seu tempo a navegação volta para home
					toast.onDidDismiss(() => {
						this.cancelar();
					});
					// Mostra mensagem
					toast.present();
				}, (err) => {
					// stop disconnect watch
					this.disconnectSubscription.unsubscribe();
					this.loading.dismiss();
					// Toast
					let toast = this.toastCtrl.create({
						message: 'Erro ao enviar report!',
						duration: 3000,
						position: 'top'
					});
					// Quando toast termina seu tempo a navegação volta para home
					toast.onDidDismiss(() => {
						this.cancelar();
					});
					// Mostra mensagem
					toast.present();
				}
			);
		}
	}

	/**
	 * Função para cancelar o envio do alerta. Volta para home
	 */
	cancelar() {
		this.navCtrl.pop();
	}

	/**
	 * Função que é chamada quando não houver conexão
	 */
	sem_conexao() {
		// Encerra carregamento, caso tenha algum aberto
		this.loading.dismiss();
		// Toast
		let toast = this.toastCtrl.create({
			message: 'Você está sem conexão! :-(',
			duration: 3000,
			position: 'top'
		});
		// Quando toast termina seu tempo a navegação volta para home
		toast.onDidDismiss(() => {
			this.cancelar();
		});
		// Mostra mensagem
		toast.present();
	}

}
