import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import { Cliente } from '../../providers/cliente-local/cliente-local';
import { ClienteDaoProvider } from  '../../providers/cliente-dao/cliente-dao';
import { PesoDaoProvider } from '../../providers/peso-dao/peso-dao';
import { Peso } from '../../providers/peso-local/peso-local';

import { EstatisticaPage } from '../estatistica/estatistica';

@IonicPage()
@Component({
  selector: 'page-imc',
  templateUrl: 'imc.html',
})
export class ImcPage {

  altura: number;
  peso: number;
  meta: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private clip: ClienteDaoProvider, public pp: PesoDaoProvider) {
      let clis = navParams.get("cli") || {cli:""};
      let pesos = navParams.get("pesos") || {pesos:""};
      this.altura = clis.altura;
      this.peso = parseFloat(pesos[pesos.length -1].atual);
      this.meta = parseFloat(pesos[pesos.length -1].meta);
  }

  ionViewDidLoad() {

  }

  getUser(){
    let cli = new Cliente(
      1,
      null,
      null,
      null,
      null,
      this.altura,
      null,
      null
    );

    this.clip.updateIMC(cli)
    .then((data: any) => {
      if(data === true){
        let p = new Peso(
          null,
          this.peso,
          moment(new Date()).format('L'),
          this.meta,
          1
        );
        this.pp.insert(p)
        .then((datap: any) => {
          if(datap === true){
            this.navCtrl.push(EstatisticaPage);
          }
        })
        .catch((e) => {console.error(e);});
      }
    })
      .catch((e) => {
        this.navCtrl.push(EstatisticaPage);
        console.error(e);
      });
  }
}
