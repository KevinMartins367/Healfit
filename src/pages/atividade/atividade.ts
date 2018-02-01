import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ITimer } from './itimer';

import { ExercicioDaoProvider } from '../../providers/exercicio-dao/exercicio-dao';
import { Exercicio } from '../../providers/exercicio-local/exercicio-local';

@IonicPage()
@Component({
  selector: 'page-atividade',
  templateUrl: 'atividade.html',
})
export class AtividadePage {

  timeInSeconds: number;
  time: ITimer;
  exer: Exercicio[];

  constructor(public navCtrl: NavController, public params: NavParams, public exerp: ExercicioDaoProvider) {
    let exers = params.get("exer") || {exer: ""};    
    this.selecionar(exers);
  }

  hasFinished() {
      return this.time.hasFinished;
  }

  initTimer() {
      if(!this.timeInSeconds) { this.timeInSeconds = 0; }

      this.time = <ITimer>{
          seconds: this.timeInSeconds,
          runTimer: false,
          hasStarted: false,
          hasFinished: false,
          secondsRemaining: this.timeInSeconds
      };

      this.time.displayTime = this.getSecondsAsDigitalClock(this.time.secondsRemaining);

  }

  startTimer() {
      this.time.hasStarted = true;
      this.time.runTimer = true;
      this.timerTick();

      console.log(this.time);
  }

  pauseTimer() {
      this.time.runTimer = false;
  }

  resumeTimer() {
      this.startTimer();
  }

  timerTick() {
      setTimeout(() => {
          if (!this.time.runTimer) { return; }
          this.time.secondsRemaining--;
          this.time.displayTime = this.getSecondsAsDigitalClock(this.time.secondsRemaining);
          if (this.time.secondsRemaining > 0) {
              this.timerTick();
          }
          else {
              this.time.hasFinished = true;
          }
      }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
      var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);
      var hoursString = '';
      var minutesString = '';
      var secondsString = '';
      hoursString = (hours < 10) ? "0" + hours : hours.toString();
      minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
      secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
      return hoursString + ':' + minutesString + ':' + secondsString;
  }

  selecionar(exc: any){
    
    this.exerp.get(exc.id)
    .then((data: Exercicio[]) => {
        this.exer = data;        
        this.timeInSeconds = data[0]['duracao'];
        this.initTimer();
    })
    .catch((e) => console.error(e));
  }

}
