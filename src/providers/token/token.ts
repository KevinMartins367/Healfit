import { Injectable } from '@angular/core';
import { sha3_512 } from 'js-sha3';
import 'rxjs/add/operator/map';
import moment from 'moment';

@Injectable()
export class TokenProvider {

  constructor() {
  }

  getToken(){
    let data_atual = Number(moment().format('DDMMYY'));
    let hora_atual = Number(moment().format('HHmm'));

    let p = 13;
    let q = 37;
    let n = p * q;
    let teste = (p*(hora_atual*hora_atual)+q*(hora_atual*data_atual))*data_atual;
    let base = btoa(String(teste));
    let ascii ="";

    for(var _i = 0; _i < base.length; _i++){
      let t = base[_i].charCodeAt(0);
      let ele = t**3;
      ascii += String(ele%n);
    }

    return sha3_512(ascii);
  }
}
