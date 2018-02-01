import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListAtividadePage } from './list-atividade';

@NgModule({
  declarations: [
    ListAtividadePage,
  ],
  imports: [
    IonicPageModule.forChild(ListAtividadePage),
  ],
})
export class ListAtividadePageModule {}
