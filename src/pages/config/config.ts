import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { GoogleFitPage } from '../google-fit/google-fit';
import { AjudePage } from '../ajude/ajude';
import { InfoPessoalPage } from '../info-pessoal/info-pessoal';
import { NotificationsPage } from '../notifications/notifications';
import { SincronizacaoPage } from '../sincronizacao/sincronizacao';


@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  activePage: any;

  pages: Array<{title: string, component: any, icons: string}>;

  constructor(public navCtrl: NavController, public platform: Platform) {
    this.pages =[
      { title: 'Informações Pessoais', component: InfoPessoalPage, icons: 'person'},
      { title: 'Notificações', component: NotificationsPage, icons: 'notifications'},
      { title: 'Google fitness', component: GoogleFitPage, icons: 'heart'},
      { title: 'sincronização', component: SincronizacaoPage, icons: 'sync'},
      { title: 'Ajuda', component: AjudePage, icons: 'help-circle'},
      { title: 'Sobre', component: AboutPage, icons: 'information-circle'}

    ];
  }

  openPage(page) {
    this.navCtrl.push(page.component);
  }

}
