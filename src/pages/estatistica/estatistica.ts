import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { BaseChartDirective } from 'ng2-charts';
import * as moment from 'moment';

import { Cliente } from '../../providers/cliente-local/cliente-local';
import { Peso } from '../../providers/peso-local/peso-local';
import { ClienteDaoProvider } from  '../../providers/cliente-dao/cliente-dao';
import { PesoDaoProvider } from '../../providers/peso-dao/peso-dao';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-estatistica',
  templateUrl: 'estatistica.html',
})
export class EstatisticaPage {

  @ViewChild(BaseChartDirective) 
  
  chart: BaseChartDirective;
  cli: Cliente[];
  imc: string;
  selectedDay = new Date();
  pesos: Peso[];
  ids:  Array<any> = [];
  select: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastProvider,
              public clip: ClienteDaoProvider, public pp: PesoDaoProvider, private modalCtrl: ModalController,
              private alertCtrl: AlertController) {
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
    if(e.active.length > 0){      
      console.log(this.ids[e.active[0]._index] );
      let alert = this.alertCtrl.create({
        title: 'Peso: ' + this.lineChartData[0].data[e.active[0]._index],
        subTitle: 'data: ' + this.lineChartLabels[e.active[0]._index] + '<br><br>Altura: ' + this.cli[0].altura,
        buttons:  [ 
          {
              text: "Editar",
              handler: data => {
              this.select = false;
              this.editar(this.ids[e.active[0]._index]-1);

              }
              
          },
          {
              text: "Excluir",
              handler: data => {
                this.select = true;
                this.deletar(this.ids[e.active[0]._index]-1);
              }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          }]
      })
      alert.present();

    }
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
            this.ids.push(datap[i].id);
            this.lineChartData[0].data.push(datap[i].atual);
            this.lineChartData[1].data.push(datap[i].meta);
            this.lineChartLabels.push(datap[i].data);
            peso.push(datap[i].atual);
            this.chart.chart.update();
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
    let modal = this.modalCtrl.create('ImcPage', {altura: this.cli[0].altura, 
                                                  peso:this.lineChartData[0].data[this.lineChartData[0].data.length -1],
                                                  meta:this.lineChartData[1].data[this.lineChartData[1].data.length -1]});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        
        this.listar(data);
        let cli = new Cliente(
          1,
          null,
          null,
          null,
          null,
          data.altura,
          null,
          null
        );
    
        this.clip.updateIMC(cli)
        .then((datac: any) => {
          if(datac === true){
            let p = new Peso(
              null,
              data.peso,
              moment(new Date()).format('L'),
              data.meta,
              1
            );
            this.pp.insert(p)
            .then((datap: any) => {
              if(datap === true){
                console.log(datap);
                console.log(datac);
                this.ids.push(this.ids[this.ids.length -1]+1);
                console.log(this.ids);
                
                this.toastCtrl.show('Peso salvo');
              }
            })
            .catch((e) => {console.error(e);});
          }
        })
        .catch((e) => {
          console.error(e);
        });
      }
    });
  }

  editar(id){
    let modal = this.modalCtrl.create('ImcPage', {id: id,
                                                  altura: this.cli[0].altura, 
                                                  peso:this.lineChartData[0].data[id],
                                                  meta:this.lineChartData[1].data[id]});
    modal.present();
    modal.onDidDismiss(data => {
      
      if (data) {
        console.log(data);
        
        let cli = new Cliente(
          1,
          null,
          null,
          null,
          null,
          data.altura,
          null,
          null
        );
    
        this.clip.updateIMC(cli)
        .then((datac: any) => {
          if(datac === true){
            let p = new Peso(
              id,
              data.peso,
              this.lineChartLabels[id+1],
              data.meta,
              1
            );
            console.log(p);
            
            this.pp.update(p)
            .then((res: any) => {
              this.deletar(id, true);
              this.toastCtrl.show('Peso editado com sucesso');
              this.listar(data);
            })
            .catch((e) => {console.error(e);});
          }
        })
        .catch((e) => {
          console.error(e);
        });
      }
    });
  }
  
  deletar(id, act: boolean = false){
    
      this.lineChartData[0].data.splice(id, 1); 
      this.lineChartData[1].data.splice(id, 1); 
      this.lineChartLabels.splice(id, 1); 
    
    if(act == false){
      this.pp.remove(id)
      .then((res: any) => {
        this.chart.chart.update();
        this.listar(null);
        this.toastCtrl.show('Peso excluído com sucesso');
      })
      .catch((e) => {console.error(e);});
    }
    
  }

  listar(data){

    if(data !=null){
      this.lineChartData[0].data.push(parseFloat(data.peso));
      this.lineChartData[1].data.push(parseFloat(data.meta));
      this.lineChartLabels.push(moment(new Date()).format('L')); 
      let im = parseFloat(data.peso)/(parseFloat(data.altura) * parseFloat(data.altura));
      this.imc = im.toFixed(2);
      this.chart.chart.update();
    }else{
      let im = parseFloat(this.lineChartData[0].data[this.lineChartData[0].data.length -1])/(parseFloat(this.cli[0].altura.toString()) * parseFloat(this.cli[0].altura.toString()));
      this.imc = im.toFixed(2);
      this.chart.chart.update();
    }
  }

}
