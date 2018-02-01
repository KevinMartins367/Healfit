import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  event = { id:null, title:null, startTime: moment(new Date()).format(), endTime: moment(new Date()).format(), allDay: false, notification: "00:00", subText: null };
  minDate = moment(new Date()).format();

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    
    moment.locale('pt-br');

    if(this.navParams.get('ev')){
      let ev = this.navParams.get('ev');
      
      this.event.id = ev.id;
      this.event.allDay = ev.allDay;
      this.event.endTime = moment(ev.endTime).format();
      this.event.startTime = moment(ev.startTime).format();
      this.event.subText = ev.subText;
      this.event.notification = ev.notification;
      this.event.title = ev.title;
    }else{
      let preselectedDate = moment(new Date()).format();
      this.event.startTime = preselectedDate;
      this.event.endTime = preselectedDate;
    }
    

  }

  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    this.viewCtrl.dismiss(this.event);
  }

}
