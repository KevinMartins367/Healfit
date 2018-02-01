import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigPage } from '../config/config';

import { Cliente } from '../../providers/cliente-local/cliente-local';
import { ClienteDaoProvider } from  '../../providers/cliente-dao/cliente-dao';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadProvider } from '../../providers/load/load';

@IonicPage()
@Component({
  selector: 'page-info-pessoal',
  templateUrl: 'info-pessoal.html',
})
export class InfoPessoalPage {

  cli: Cliente[];
  password: string;
  c = {email: null, password: null};

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastProvider, 
    public clip: ClienteDaoProvider, private lp: LoadProvider) { 
      this.get();
      console.log(this.cli);
    }

  ionViewDidLoad() {
  }

  get(){
    let id = 1;
    this.clip.get(id)
    .then((data: Cliente[]) => {
      this.cli = data;
      console.log(this.cli);
      
    })
    .catch((e) => {
      this.toastCtrl.show('erro');
      console.error(e)
    });
  }

  private update(cli : Cliente){
    this.clip.updateInfo(cli)
    .then((data: any) => {
      if(data === true){
        console.log(data);
        this.toastCtrl.show('Informações salvas');
      }
    })
    .catch((e) => {
      console.error(e);
      this.toastCtrl.show('Erro ao salvar');
    });
  }

  save(cli: Cliente){
    if (this.password === this.cli[0].password) {
      
    }
  }

}
