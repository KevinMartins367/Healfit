import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-imc',
  templateUrl: 'imc.html',
})
export class ImcPage {

  user = {id: null, altura: null, peso: null, meta: null};

  constructor(public navCtrl: NavController, public navParams: NavParams,
               public viewCtrl: ViewController) {
      this.user.id = navParams.get("id") || {id:"0"};
      this.user.altura = navParams.get("altura") || {altura:"0"};
      this.user.peso = parseFloat(navParams.get("peso") || {pesos:"0"});
      this.user.meta = parseFloat(navParams.get("meta") || {pesos:"0"});
      console.log(this.user);
      
  }


  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    this.viewCtrl.dismiss(this.user);
  }
}
