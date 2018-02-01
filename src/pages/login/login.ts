import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { ToastProvider } from '../../providers/toast/toast';
import { ClienteProvider } from './../../providers/cliente/cliente';
import { Cliente } from './../../providers/cliente-local/cliente-local';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  users: any[];
  public user: Cliente;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private toast: ToastProvider, public cli_p: ClienteProvider) {

    // this.user = new Cliente();
  }


  login() {
    this.cli_p.login(this.user)
      .then((result: any) => {

        this.navCtrl.push(TabsPage);
        // this.user = new Cliente();
        // this.user.Cli_Cod = result.Cod;
        // this.user.Cli_id_User = result.user;
        //
        // this.cli_p.Selecionar(this.user)
        // .then((result: any) => {
        //
        //   let userL: Cliente_l;
        //   userL =  new Cliente_l();
        //   this.user.Cli_Cod = result.Cod;
        //   userL.Cli_Login = result.Login;
        //   userL.Cli_Token = result.Cod;
        //   userL.Cli_Pack_Exc = result.Exc;
        //   userL.Cli_Peso = result.Peso;
        //   userL.Cli_Altura = result.Altura;
        //   userL.Cli_id_Pessoa = result.id_P;
        //   userL.Cli_id_User = result.user;
        //
        //   this.cli_l_p.inserir(userL)
        //     .then((data: any) =>{
        //       this.toast.show('Login efetuado com sucesso');
        //       this.navCtrl.setRoot(HomePage, {});
        //     })
        //     .catch((e) => console.error(e));
        // });

        //Salvar o token no Ionic Storage para usar em futuras requisições.
        //Redirecionar o usuario para outra tela usando o navCtrl
        //this.navCtrl.pop();
        //this.navCtrl.setRoot()
      })
      .catch((error: any) => {
        this.toast.show('Erro ao efetuar login. Erro: ' + error.error);
      });
  }
}
