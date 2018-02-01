import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { ToastProvider } from '../../providers/toast/toast';

import { AtividadePage } from '../atividade/atividade';
import { AtividadeGenericaPage } from '../atividade_Generica/atividade_Generica';
import { LoadProvider } from '../../providers/load/load';
import { ExercicioDaoProvider } from '../../providers/exercicio-dao/exercicio-dao';
import { Exercicio } from '../../providers/exercicio-local/exercicio-local';
import { SeutreinoDaoProvider } from '../../providers/seutreino-dao/seutreino-dao';
import { TreinoDaoProvider } from '../../providers/treino-dao/treino-dao';

@IonicPage()
@Component({
  selector: 'page-list-atividade',
  templateUrl: 'list-atividade.html',
})
export class ListAtividadePage {

  exer = {itens: []};
  searchControl: FormControl;
  name:  string = '';
  categories: string = 'treino';
  searching: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private lp: LoadProvider, 
    public exerp: ExercicioDaoProvider, public toastCtrl: ToastProvider, public stp: SeutreinoDaoProvider,
    public tp: TreinoDaoProvider) {
                this.get();
                this.searchControl = new FormControl();
                
  }

  ionViewDidLoad() {
    
  }

  openOutro(exer: Exercicio) {
    this.lp.carregar();
    this.navCtrl.push(AtividadeGenericaPage, {exer: exer});
  }
  openExer(exer: Exercicio) {
    this.lp.carregar();
    this.navCtrl.push(AtividadePage, {exer: exer});
  }

  outros(){
    
    this.exerp.getAll()
    .then((data: Exercicio[]) => {
      this.exer.itens = data;  
    })
    .catch((e) =>{
     this.toastCtrl.show('erro');
      console.error(e); 
    });

    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.setFilteredItems();
    });
  }

  get(){
    this.stp.get()
    .then((data: any[]) => {
      if(data[0].title != null){
        let pack_Exc = data[0].title.split("#");
        let treino: any[] = [];
        let type = {title: null, exer:[]};
        for (var i = 0; i < pack_Exc.length; i++) {

          type.title.push(pack_Exc[i]);
          this.tp.getUser(pack_Exc[i])
          .then((datat: number) =>{
            
            let exercicios: any[] = [];
            this.exerp.getUser(datat)
            .then((datae: Exercicio[]) => {
              exercicios.push(datae);
            })
            .catch((e) => {
              this.toastCtrl.show('erro');
              console.error(e); 
            });
            type.exer = exercicios;
            
          })
          .catch((e) => {
            console.error(e); 
          });
          treino.push(type);
        }
        this.exer.itens = treino;
        console.log(this.exer);
        
      }else{
        return [];
      }
    })
    .catch((e) => {
      console.error(e); 
    });
  }

  //filtro
  filterItems(name){
    return this.exer.itens.filter((item) => {
        return item.nome.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });    
  }

  setFilteredItems() {
    let filter = this.filterItems(this.name);
    if (filter.length > 0) {
      this.exer.itens = filter;
      this.searching = false;
    }else{
      this.toastCtrl.show('item não encontrado');
      this.searching = false;
    }
  }

  onSearchInput(){
    this.searching = true;
    this.outros();
  }

}
