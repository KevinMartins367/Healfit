import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtividadeGenericaPage } from './atividade_Generica';

@NgModule({
  declarations: [
    AtividadeGenericaPage,
  ],
  imports: [
    IonicPageModule.forChild(AtividadeGenericaPage),
  ],
})
export class AtividadeGenericaPageModule {}
