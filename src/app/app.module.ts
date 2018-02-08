import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NgCalendarModule } from 'ionic2-calendar';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Vibration } from '@ionic-native/vibration';

import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EstatisticaPage } from '../pages/estatistica/estatistica';
import { AtividadePage } from '../pages/atividade/atividade';
import { ListAtividadePage } from '../pages/list-atividade/list-atividade';
import { ConfigPage } from '../pages/config/config';
import { GoogleFitPage } from '../pages/google-fit/google-fit';
import { AjudePage } from '../pages/ajude/ajude';
import { CalendarPage } from '../pages/calendar/calendar';
import { InfoPessoalPage } from '../pages/info-pessoal/info-pessoal';
import { NotificationsPage } from '../pages/notifications/notifications';
import { SincronizacaoPage } from '../pages/sincronizacao/sincronizacao';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TokenProvider } from '../providers/token/token';
import { DatabaseProvider } from '../providers/database/database';
import { NotificationProvider } from '../providers/notification/notification';
import { ToastProvider } from '../providers/toast/toast';
import { LoadProvider } from '../providers/load/load';
import { AlertsProvider } from '../providers/alerts/alerts';

import { ExercicioProvider } from '../providers/exercicio/exercicio';
import { ClienteProvider } from '../providers/cliente/cliente';
import { ExercicioDaoProvider } from '../providers/exercicio-dao/exercicio-dao';
import { ClienteDaoProvider } from '../providers/cliente-dao/cliente-dao';
import { EventosDaoProvider } from '../providers/eventos-dao/eventos-dao';
import { PesoDaoProvider } from '../providers/peso-dao/peso-dao';
import { TreinoDaoProvider } from '../providers/treino-dao/treino-dao';
import { SeutreinoDaoProvider } from '../providers/seutreino-dao/seutreino-dao';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    LoginPage,
    HomePage,
    TabsPage,
    EstatisticaPage,
    AtividadePage,
    ListAtividadePage,
    ConfigPage,
    GoogleFitPage,
    AjudePage,
    InfoPessoalPage,
    NotificationsPage,
    SincronizacaoPage,
    CalendarPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule,
    ChartsModule,
    IonicModule.forRoot(MyApp, {
      monthShortNames:["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 'Jul', 'Ago', 'Set', 'Out', 'Nov', "Dez"]
    }),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    LoginPage,
    HomePage,
    TabsPage,
    EstatisticaPage,
    AtividadePage,
    ListAtividadePage,
    ConfigPage,
    GoogleFitPage,
    AjudePage,
    InfoPessoalPage,
    NotificationsPage,
    SincronizacaoPage,
    CalendarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: 'pt-Br' },
    SQLite,
    Toast,
    LocalNotifications,
    TokenProvider,
    DatabaseProvider,
    ExercicioProvider,
    ClienteProvider,
    ToastProvider,
    LoadProvider,
    AlertsProvider,
    ExercicioDaoProvider,
    ClienteDaoProvider,
    EventosDaoProvider,
    PesoDaoProvider,
    NotificationProvider,
    TreinoDaoProvider,
    SeutreinoDaoProvider,
    Vibration
  ]
})
export class AppModule {}
