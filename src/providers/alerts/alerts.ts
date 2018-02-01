import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Injectable()
export class AlertsProvider {

  constructor(private ln: LocalNotifications, public alertCtrl: AlertController, public plt: Platform) {  }
  
  public show(h: any, alarme: any){
    this.ln.schedule({
      id: 1,
      title: 'teste',
      text: 'hora do show',
      at: new Date( new Date(h).getTime() - alarme),
      data: { mydata: 'hora do show' }
    });
    console.log(new Date( new Date(h).getTime() - alarme));
    
  }

  public get(){
    this.ln.getAll();
  }
}
