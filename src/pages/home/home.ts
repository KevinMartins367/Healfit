import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';

import { SeutreinoDaoProvider } from '../../providers/seutreino-dao/seutreino-dao';
import { Seutreino } from '../../providers/seutreino-local/seutreino-local';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  treino: any;

  constructor(public navCtrl: NavController, public stp: SeutreinoDaoProvider) {

    this.get();
  }

  get(){
    this.stp.get()
    .then((data: any[]) => {
      let name: string;
      let pack_Exc = data[0].title.split("#");
      for (let i = 0; i < pack_Exc.length; i++) {
        let element = pack_Exc[i];
        name+=element;
      }
      let intensity: string;
      if (data[0].intensity === 1) {
        intensity = "Iniciante";
      }else if (data[0].intensity === 2) {
        intensity = "Intermediario";
      }else if (data[0].intensity === 3) {
        intensity = "Avançado";
      }
      let st = new Seutreino(
        data[0].id,
        'Treino '+name,
        data[0].startTime,
        data[0].endTime,
        data[0].Object,
        intensity);
      
        this.treino = st;
        console.log(this.treino);
    })
    .catch((e) => {
      console.error(e); 
    });
  }

}
