import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { Vibration } from '@ionic-native/vibration';
import * as moment from 'moment';

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

    console.log(this.converte(this.teste));
    // this.alert.show(this.teste, a);
    this.vibration.vibrate(this.alarme);
  }
  
  converte(time){
    let timeParts = time.split(":");
    let al = (+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000);
    return al;
  }
}
