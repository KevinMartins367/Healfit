import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController  } from 'ionic-angular';
import * as moment from 'moment';

import { Evento } from '../../providers/evento-local/evento-local';
import { EventosDaoProvider } from '../../providers/eventos-dao/eventos-dao';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  eventSource = [];
  viewTitle: string;
  noEventsLabel: string = "Não há eventos listados";
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    locale: 'pt-br',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, 
              private alertCtrl: AlertController, public ep: EventosDaoProvider) {
    moment.locale('pt-br');   
    // this.get();
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.ep.insert(data)
        .then((res: any) => {
          this.listar(data);
        })
        .catch((e) => {console.error(e);});
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    
    let start = moment(event.startTime).format('LTS');
    let end = moment(event.endTime).format('LTS');
    if(event.allDay == true){

      let alert = this.alertCtrl.create({
        title: '' + event.title,
        subTitle: 'O dia todo' + '<br><br>Inicio: ' + start + '<br><br>Término: ' + end,
        buttons: ['OK']
      })
      alert.present();

    }else{

      let alert = this.alertCtrl.create({
        title: '' + event.title,
        subTitle: 'Inicio: ' + start + '<br><br>Término: ' + end,
        buttons: ['OK']
      })
      alert.present();

    }
  }
 
  onTimeSelected(ev) {
      this.selectedDay = ev.selectedTime;
  }

  editar(ev){
    let modal = this.modalCtrl.create('EventModalPage', {ev: ev});
    modal.present();
    modal.onDidDismiss(data => {
      
      if (data) {
        this.ep.update(data)
        .then((res: any) => {
          this.deletar(ev, true);
          this.listar(data);
        })
        .catch((e) => {console.error(e);});
      }
    });
  }
  
  deletar(ev, act: boolean = false){
    var idx = this.eventSource.indexOf(ev, 0);
    if (idx != -1) {
      this.eventSource.splice(idx, 1); 
    }
    if(act == false){
      this.ep.remove(ev.id)
      .then((res: any) => {
        this.listar(null);
      })
      .catch((e) => {console.error(e);});
    }
    
  }

  listar(data){
    
    let eventData = data;
    let events = this.eventSource;

    if (data != null){
      eventData.startTime = new Date(data.startTime);
      eventData.endTime = new Date(data.endTime);
      events.push(eventData);
    }

    for (let i = 0; i < events.length; i++) {

      let element = events[i];
     
      if(moment(element.startTime).format('L') == moment(element.endTime).format('L')){
        if(element.allDay == true){
          element.subText = 'O dia todo';
        }else{
          element.subText = moment(element.startTime).format('LTS');
        }
      } else if(parseInt(moment(element.endTime).format('DD')) > parseInt(moment(element.startTime).format('DD'))){

        if(element.allDay == true){
          element.subText = "O dia todo    " + moment(element.startTime).format('L') +" || " + moment(element.endTime).format('L');
        }else{
          element.subText = moment(element.startTime).format('L') +' || ' + moment(element.endTime).format('L');
        }
      }
    }

    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
    });
  }

  get(){
    this.ep.getAll()
    .then((e: Evento[]) => {
      console.log(e);
      for (let i = 0; i < e.length; i++) {
        let ev = { id: e[i].id, title:e[i].title, startTime: new Date(e[i].startTime), endTime: new Date(e[i].endTime), allDay: e[i].allDay, subText: null };
        this.eventSource.push(ev);
      }
      console.log(this.eventSource);
      this.listar(null);
    })
    .catch((e) => {console.error(e);});
  }
  
}
