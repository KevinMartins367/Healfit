import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class LoadProvider {

  constructor( public loadingCtrl: LoadingController) { }

  carregar(){
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div>
        <img src="img/picasion.gif" >
        <a>Aguarde enquanto estamos atualizando as informações</a>
      </div>`,
      cssClass:``

    });
    return loading;
    // return loading.present();
  }
}
