import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';

declare var Connection;

@Injectable()
export class ConnectivityServiceProvider {

	onDevice: boolean;

	constructor(public platform: Platform) {
		this.onDevice = this.platform.is('cordova');
	}

	isOnline(): boolean {
		if(this.onDevice && Network['connection']) {
			return Network['connection'] !== Connection.NONE;
		} else {
			return navigator.onLine;
		}
	}

}
