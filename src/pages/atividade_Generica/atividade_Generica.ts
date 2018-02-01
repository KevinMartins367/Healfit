import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ExercicioDaoProvider } from '../../providers/exercicio-dao/exercicio-dao';
import { Exercicio } from '../../providers/exercicio-local/exercicio-local';

@IonicPage()
@Component({
  selector: 'page-atividade_Generica',
  templateUrl: 'atividade_Generica.html',
})
export class AtividadeGenericaPage {

  exer: Exercicio[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public exerp: ExercicioDaoProvider) {
    let exers = navParams.get("exer") || {exer: ""};    
    this.selecionar(exers);
  }

  selecionar(exc: any){
    
    this.exerp.get(exc.id)
    .then((data: Exercicio[]) => {
        this.exer = data; 
    })
    .catch((e) => console.error(e));
  }
}
