import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class ToastProvider {

  constructor(public toastCtrl: ToastController) {}

  public show(mensagem: string){
    const toast = this.toastCtrl.create({
    message: mensagem,
    duration: 3000,
    position: 'top'
  });
    toast.present();
  }

}
