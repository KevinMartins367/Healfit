import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenProvider } from '../token/token';
import { Cliente } from '../cliente-local/cliente-local';
import 'rxjs/add/operator/map';

@Injectable()
export class ClienteProvider {

  private API_URL = 'http://localhost:8000/api/User/Cliente/';
  private headers = new Headers({ "Content-Type": "application/json; charset=UTF-8"});

  constructor(public http: Http, private token: TokenProvider) {  }

  login(cli :Cliente) {
    return new Promise((resolve, reject) => {
      // var data = {
      //   Cli_Login: cli.Cli_Login,
      //   Cli_Senha: cli.Cli_Senha
      // };

      this.http.post(this.API_URL + 'login', JSON.stringify({ Cli_Login: cli.email,
      Cli_Senha: cli.password}))
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  alterarS(cli :Cliente) {
    return new Promise((resolve, reject) => {
      var data = {
        token: this.token.getToken(),
        acao_cli: 'alterarSenha',
        Cod: cli.id,
        senha: cli.password
      };

      this.http.post(this.API_URL + 'ClienteController.php', data, {
        headers: this.headers,
        method: "POST"
      })
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  alterarMedida(cli :Cliente) {
    return new Promise((resolve, reject) => {
      var data = {
        token: this.token.getToken(),
        acao_cli: 'alterarMedida',
        Cod: cli.id,
        Altura: cli.altura
      };

      this.http.post(this.API_URL + 'ClienteController.php', data, {
        headers: this.headers,
        method: "POST"
      })
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  Selecionar(cli :Cliente) {
    return new Promise((resolve, reject) => {
      var data = {
        token: ''+this.token.getToken()+'',
        acao_cli: 'Selecionar',
        Cli_Cod: ''+cli.id+'',
        Cli_id_User: ''+cli.user_id+''
      };
      this.http.post(this.API_URL + 'ClienteController.php', data, {
        headers: this.headers,
        method: "POST",
      })
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

}

