import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cliente } from '../../providers/cliente-local/cliente-local';
import { ClienteDaoProvider } from  '../../providers/cliente-dao/cliente-dao';
import { PesoDaoProvider } from '../../providers/peso-dao/peso-dao';
import { Peso } from '../../providers/peso-local/peso-local';
import * as moment from 'moment';

import { ImcPage } from '../imc/imc';

@IonicPage()
@Component({
  selector: 'page-estatistica',
  templateUrl: 'estatistica.html',
})
export class EstatisticaPage {

  cli: Cliente[];
  imc: string;
  selectedDay = new Date();
  pesos: Peso[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public clip: ClienteDaoProvider, public pp: PesoDaoProvider) {
                moment.locale('pt-br');   
                this.get();
                
  }

  ionViewDidLoad() {
  }

  public lineChartData:Array<any> = [ {data: [0], label: 'Peso'},
                                      {data: [0], label: 'Meta'}];
  public lineChartLabels:Array<any> = ['inicio'];
  public lineChartOptions:any = { responsive: true };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  get(){
    let id = 1;
    this.clip.get(id)
    .then((data: any[]) => {
      this.cli = data;
      this.pp.getAll()
      .then((datap: Peso[]) => {
        if(datap != null){
          console.log(datap);
          
          let peso: Array<any> = [];
          this.pesos = datap;
          for (let i = 0; i < datap.length; i++) {
            this.lineChartData[0].data.push(datap[i].atual);
            this.lineChartData[1].data.push(datap[i].meta);
            this.lineChartLabels.push(datap[i].data);
            peso.push(datap[i].atual);
          }

          let im = parseFloat(peso[peso.length -1])/(parseFloat(data[0].altura) * parseFloat(data[0].altura));
          this.imc = im.toFixed(2);
        }else{
          this.imc = '0';
        }

      })
      .catch((e) => {
        console.error(e); 
      });
    })
    .catch((e) => {
      console.error(e); 
    });
  }
  
  openPage() {
    console.log(this.cli);
    
    this.navCtrl.push(ImcPage, {cli: this.cli[0], pesos: this.pesos});
  }
}
