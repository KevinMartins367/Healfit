import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  teste = "10:00";
  alarme: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertsProvider, private vibration: Vibration) {  }

  ionViewDidLoad() {
  }

  save(){

    console.log(this.alarme);
    // this.alert.show(this.teste, a);
    this.vibration.vibrate(this.alarme);
  }
  
}
