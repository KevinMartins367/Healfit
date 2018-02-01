import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast';
import 'rxjs/add/operator/map';

@Injectable()
export class ToastProvider {

  constructor(public toastCtrl: Toast) {}

  public show(mensagem: string){
    this.toastCtrl.showShortBottom(mensagem).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
