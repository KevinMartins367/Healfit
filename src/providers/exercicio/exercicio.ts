import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Exercicio } from '../exercicio-local/exercicio-local';
// import { TokenProvider } from '../token/token';
import 'rxjs/add/operator/map';

@Injectable()
export class ExercicioProvider {

  private API_URL = 'http://localhost:8000/api/user/Exer/';

  constructor(public http: Http) { }

  selecionar(exc: Exercicio) {
    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL+exc.user_id+ '/Exercicio/'+exc.id)
      .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  listar(exc: Exercicio) {
    return new Promise((resolve, reject) => {
    console.log(exc);
    
      this.http.get(this.API_URL+exc.user_id)
      .subscribe((result: any) => {
          resolve(result.json());
          
        },
        (error) => {
          reject(error.json());
        });
    });
  }
}

