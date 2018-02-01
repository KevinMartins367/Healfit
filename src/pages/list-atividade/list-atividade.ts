import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AtividadePage } from '../atividade/atividade';
import { LoadProvider } from '../../providers/load/load';
import { ExercicioDaoProvider } from '../../providers/exercicio-dao/exercicio-dao';
import { Exercicio } from '../../providers/exercicio-local/exercicio-local';
import { Cliente } from '../../providers/cliente-local/cliente-local';
import { ClienteDaoProvider } from  '../../providers/cliente-dao/cliente-dao';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-list-atividade',
  templateUrl: 'list-atividade.html',
})
export class ListAtividadePage {

  exer: Exercicio[];
  pack_Exc: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private lp: LoadProvider, public exerp: ExercicioDaoProvider,
              public tp: ToastProvider, public clip: ClienteDaoProvider) {
                
  }

  ionViewDidLoad() {
    this.get();
    this.exerUser();
  }

  openExer(exer: Exercicio) {
    this.lp.carregar();
    this.navCtrl.push(AtividadePage, {exer: exer});
  }

  outros(){
    
    this.exerp.getAll()
    .then((data: Exercicio[]) => {
      this.exer = data;
    })
    .catch((e) =>{
     this.tp.show('erro');
      console.error(e); 
    });
  }

  exerUser(){
    let pack_Exc = this.pack_Exc;
    let exercicios: any[] = [];
    for (var i = 0; i < pack_Exc.length; i++) {
      var exercicio = parseInt(pack_Exc[i]);
      this.exerp.getUser(exercicio)
      .then((data: Exercicio[]) => {
        exercicios.push(data);
      })
      .catch((e) => {
        this.tp.show('erro');
        console.error(e); 
      });
    }
    this.exer = exercicios;
  }


  get(){
    let id = 1;
    this.clip.get(id)
    .then((data: any[]) => {
      if(data[0].pack_Exc != null){
        let linhas: any[] = [];
        let pack_Exc = data[0].pack_Exc.split("#");
        this.pack_Exc = pack_Exc;
      }else{
        return [];
      }
    })
    .catch((e) => {
      console.error(e); 
    });
  }
}
